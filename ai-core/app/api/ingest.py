from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from app.services.rag import process_and_store_document
from app.core.supabase_client import get_supabase
import uuid

router = APIRouter()
supabase = get_supabase()

class IngestRequest(BaseModel):
    widget_id: str
    title: str
    text_content: str

@router.post("/upload-text")
async def upload_text(request: IngestRequest, background_tasks: BackgroundTasks):
    """
    Эндпоинт загрузки сырого текста в базу знаний.
    Обработка и векторизация происходит в фоновом режиме для скорости.
    """
    try:
        doc_id = str(uuid.uuid4())
        
        # 1. Создаем запись о документе со статусом PROCESSING
        supabase.table("Document").insert({
            "id": doc_id,
            "widgetId": request.widget_id,
            "title": request.title,
            "type": "RAW_TEXT",
            "status": "PROCESSING"
        }).execute()
        
        # 2. Отправляем в фоновую задачу
        background_tasks.add_task(process_and_store_document, doc_id, request.widget_id, request.text_content)
        
        return {"status": "success", "document_id": doc_id, "message": "Document is processing in background"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
