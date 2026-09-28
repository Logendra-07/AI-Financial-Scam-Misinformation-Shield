import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="Investor")
    email = Column(String(150), unique=True, index=True, nullable=True)
    language = Column(String(20), default="English")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    analyses = relationship("Analysis", back_populates="user")


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    input_type = Column(String(30), default="text") # text, screenshot, voice, url
    original_text = Column(Text, nullable=False)
    masked_text = Column(Text, nullable=True)
    language = Column(String(30), default="English")
    risk_level = Column(String(20), nullable=False) # LOW, MEDIUM, HIGH, BLOCKED_ADVICE
    risk_score = Column(Integer, default=0) # 0 to 100
    summary = Column(Text, nullable=True)
    explanation = Column(Text, nullable=False)
    actions = Column(Text, nullable=True) # JSON string or comma-separated
    disclaimer = Column(Text, nullable=False)
    is_advice_intercepted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="analyses")
    indicators = relationship("RiskIndicator", back_populates="analysis", cascade="all, delete-orphan")
    sources = relationship("Source", back_populates="analysis", cascade="all, delete-orphan")


class RiskIndicator(Base):
    __tablename__ = "risk_indicators"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    name = Column(String(150), nullable=False)
    severity = Column(String(20), nullable=False) # HIGH, MEDIUM, LOW
    category = Column(String(80), nullable=True)
    description = Column(Text, nullable=True)
    weight = Column(Integer, default=10)

    analysis = relationship("Analysis", back_populates="indicators")


class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    source_name = Column(String(200), nullable=False)
    source_url = Column(Text, nullable=True)
    verification_status = Column(String(80), default="UNVERIFIED") # VERIFIED, OFFICIAL_REGULATOR, SUSPICIOUS, UNVERIFIED

    analysis = relationship("Analysis", back_populates="sources")


class LearnModule(Base):
    __tablename__ = "learn_modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(100), unique=True, index=True)
    category = Column(String(100), default="Scam Defense")
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    read_time = Column(String(20), default="3 min")
    red_flags = Column(Text, nullable=True)
