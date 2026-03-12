from app.config.database import Database
from datetime import datetime

db = Database()

deals_collection = db.get_collection("deals")

deal = {
    "_id": "deal_001",
    "reference": "DL-2026-0001",
    "title": "Déploiement CRM Europe 2026",
    "subtitle": "Contrat cadre pour transformation CRM",
    "clientName": "ACME Corporation",
    "clientCode": "ACME-001",
    "industry": "Technology",
    "country": "France",
    "city": "Paris",
    "ownerName": "Alice Martin",
    "ownerEmail": "alice.martin@company.com",
    "status": "NEGOTIATION",
    "subStatus": "LEGAL_REVIEW",
    "priority": "HIGH",
    "stage": "proposal",
    "estimatedRevenue": 120000,
    "estimatedMargin": 35000,
    "currency": "EUR",
    "probability": 70,
    "expectedCloseDate": datetime(2026, 4, 15),
    "contacts": [
        {
            "firstName": "Jean",
            "lastName": "Dupont",
            "jobTitle": "Directeur IT",
            "email": "jean.dupont@acme.com",
            "isDecisionMaker": True
        }
    ],
    "products": [
        {
            "name": "CRM Enterprise Suite",
            "quantity": 1,
            "unitPrice": 90000,
            "discountPercent": 10,
            "finalPrice": 81000
        }
    ],
    "financials": {
        "subtotal": 105000,
        "discountGlobalPercent": 5,
        "taxPercent": 20,
        "totalExclTax": 99750,
        "totalInclTax": 119700,
        "estimatedCost": 65000,
        "expectedProfit": 34750
    },
    "commercial": {
        "needIdentified": True,
        "competitors": ["Salesforce", "HubSpot"],
        "painPoints": ["outils dispersés", "manque de reporting"],
        "proposedSolution": "Suite CRM unifiée",
        "nextStep": "Validation juridique",
        "nextStepDate": "2026-03-20"
        },
        "delivery": {
        "deliveryMode": "hybrid",
        "region": "EMEA",
        "implementationComplexity": "MEDIUM",
        "estimatedKickoffDate": "2026-05-05",
        "estimatedDeliveryWeeks": 10,
        "requiresTraining": True,
        "requiresMigration": True
        },
        "governance": {
        "createdBy": "alice.martin@company.com",
        "approvedByManager": False,
        "requiresLegalValidation": True,
        "requiresFinanceValidation": True,
        "isArchived": False
        },
        "tags": ["crm", "enterprise", "france"],
        "notes": [
        {
        "author": "Alice Martin",
        "content": "Premier échange positif.",
        "createdAt": "2026-03-11T10:00:00Z"
        }
        ],
        "customFields": {
        "decisionMaker": "Jean Dupont",
        "businessUnit": "Europe",
        "partnerInvolved": True,
        "partnerName": "TechAlliance"
        },        
    "createdAt": datetime.now(),
    "updatedAt": datetime.now()
}

deals_collection.insert_one(deal)


templates_collection = db.get_collection("templates")

template_finance = {
    "_id": "tmpl_finance_001",
    "name": "Vue financière",
    "code": "FINANCE_VIEW",
    "description": "Affiche uniquement les informations financières d'un deal",
    "isActive": True,
    "visibleFields": [
        "reference", "title", "clientName", "status",
        "estimatedRevenue", "estimatedMargin", "currency",
        "financials.subtotal", "financials.discountGlobalPercent",
        "financials.taxPercent", "financials.totalExclTax",
        "financials.totalInclTax", "financials.estimatedCost",
        "financials.expectedProfit", "expectedCloseDate"
    ],
     "sections": [
    {
    "name": "Informations générales",
    "fields": ["reference", "title", "clientName",
    "status", "expectedCloseDate"]
    },
    {
    "name": "Indicateurs financiers",
    "fields": [
    "estimatedRevenue", "estimatedMargin", "currency",
    "financials.subtotal", "financials.discountGlobalPercent",
    "financials.taxPercent", "financials.totalExclTax",
    "financials.totalInclTax", "financials.estimatedCost",
    "financials.expectedProfit"
    ]
    }
    ],
    "labels": {
    "reference": "Référence",
    "title": "Nom du deal",
    "clientName": "Client",
    "estimatedRevenue": "CA estimé",
    "estimatedMargin": "Marge estimée",
    "expectedCloseDate": "Closing prévu",
    "financials.totalInclTax": "Montant TTC"
    },
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }

templates_collection.insert_one(template_finance)



template_synthetique = {
    "_id": "tmpl_synth_001",
    "name": "Vue synthétique",
    "code": "SYNTH_VIEW",
    "description": "Vue synthétique du deal",
    "isActive": True,
    "visibleFields": ["reference", "title", "clientName", "status", "ownerName", "estimatedRevenue", "expectedCloseDate"],
    "sections": [
        {
            "name": "Informations principales",
            "fields": ["reference", "title", "clientName", "status", "ownerName", "estimatedRevenue", "expectedCloseDate"]
        }
    ],
    "labels": {
        "reference": "Référence",
        "title": "Nom du deal",
        "clientName": "Client",
        "status": "Statut",
        "ownerName": "Owner",
        "estimatedRevenue": "Montant estimé",
        "expectedCloseDate": "Date de closing"
    },
    "createdAt": datetime.now(),
    "updatedAt": datetime.now()
}

templates_collection.insert_one(template_synthetique)


template_commercial = {
    "_id": "tmpl_commercial_001",
    "name": "Vue commerciale",
    "code": "COMM_VIEW",
    "description": "Vue commerciale du deal",
    "isActive": True,
    "visibleFields": ["clientName", "contacts", "competitors", "painPoints", "nextStep", "probability"],
    "sections": [
        {
            "name": "Informations commerciales",
            "fields": ["clientName", "contacts", "competitors", "painPoints", "nextStep", "probability"]
        }
    ],
    "labels": {
        "clientName": "Client",
        "contacts": "Contacts",
        "competitors": "Concurrents",
        "painPoints": "Pain points",
        "nextStep": "Prochaine étape",
        "probability": "Probabilité"
    },
    "createdAt": datetime.now(),
    "updatedAt": datetime.now()
}

templates_collection.insert_one(template_commercial)


template_direction = {
    "_id": "tmpl_direction_001",
    "name": "Vue direction",
    "code": "DIRECTION_VIEW",
    "description": "Vue pour la direction",
    "isActive": True,
    "visibleFields": ["status", "priority", "ownerName", "estimatedRevenue", "probability", "nextStep", "governance.requiresLegalValidation", "governance.requiresFinanceValidation"],
    "sections": [
        {
            "name": "Informations direction",
            "fields": ["status", "priority", "ownerName", "estimatedRevenue", "probability", "nextStep", "governance.requiresLegalValidation", "governance.requiresFinanceValidation"]
        }
    ],
    "labels": {
        "status": "Statut",
        "priority": "Priorité",
        "ownerName": "Owner responsable",
        "estimatedRevenue": "Revenu estimé",
        "probability": "Probabilité",
        "nextStep": "Prochaine étape",
        "governance.requiresLegalValidation": "Validation juridique",
        "governance.requiresFinanceValidation": "Validation finance"
    },
    "createdAt": datetime.now(),
    "updatedAt": datetime.now()
}

templates_collection.insert_one(template_direction)