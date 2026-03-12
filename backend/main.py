from fastapi import FastAPI
from app.routes.dealroutes import router as deal_router
from app.routes.templateroutes import router as template_router

app = FastAPI()

app.include_router(deal_router)
app.include_router(template_router)


@app.get("/")
def root():
    return {"message": "Deal Template API"}