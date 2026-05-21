from supabase import create_client, Client
from app.core.config import SUPABASE_URL, SUPABASE_KEY

def get_supabase() -> Client:
    """
    Создает и возвращает клиент Supabase.
    В production для безопасности бэкенда рекомендуется использовать SUPABASE_SERVICE_ROLE_KEY
    вместо анонимного ключа, чтобы обходить RLS (Row Level Security).
    """
    return create_client(SUPABASE_URL, SUPABASE_KEY)
