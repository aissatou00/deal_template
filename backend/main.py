from fastapi import FastAPI
from app.routes.dealRoutes import router as deal_router
from app.routes.templateRoutes import router as template_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173"   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

app.include_router(deal_router)
app.include_router(template_router)


@app.get("/")
def root():
    return {"message": "Deal Template API"}