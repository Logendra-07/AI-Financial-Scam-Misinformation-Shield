from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class IndicatorSchema(BaseModel):
    name: str
    severity: str # HIGH, MEDIUM, LOW
    category: Optional[str] = "General"
    description: Optional[str] = None
    weight: int = 10

class SourceSchema(BaseModel):
    source_name: str
    source_url: Optional[str] = None
    verification_status: str = "UNVERIFIED"

class AnalyzeRequest(BaseModel):
    message: str = Field(..., description="Message text, advertisement copy, SMS, or transcribed voice")
    language: str = Field("English", description="Target explanation language: English, Tamil, Hindi, Telugu")
    input_type: str = Field("text", description="Input channel: text, screenshot, voice, url")

class AnalyzeResponse(BaseModel):
    id: Optional[int] = None
    risk_level: str
    risk_score: int
    summary: str
    indicators: List[IndicatorSchema]
    explanation: str
    actions: List[str]
    sources: List[SourceSchema]
    language: str
    masked_content: str
    disclaimer: str
    is_advice_intercepted: bool = False
    created_at: Optional[datetime] = None

class HistoryItem(BaseModel):
    id: int
    input_type: str
    snippet: str
    risk_level: str
    risk_score: int
    language: str
    created_at: datetime
    indicator_count: int

class LearnModuleSchema(BaseModel):
    id: int
    title: str
    slug: str
    category: str
    summary: str
    content: str
    read_time: str
    red_flags: List[str] = []

class StatsResponse(BaseModel):
    total_analyzed: int
    high_risk_count: int
    medium_risk_count: int
    low_risk_count: int
    advice_blocked_count: int
    estimated_funds_protected_inr: int
