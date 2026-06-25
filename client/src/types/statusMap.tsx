interface StatusConfig {
    displayName: string;
    color: string;
}

export const statusMapping: Record<string, StatusConfig> = { 
    "APPLIED": {
        displayName: "Applied",
        color: "Green"
    },
    "RECRUITER_SCREEN": {
        displayName: "Recruiter Screen",
        color: "Gray"
    },
    "TECHNICAL_INTERVIEW": {
        displayName: "Technical Interview",
        color: "Gray"
    },
    "FINAL_INTERVIEW": {
        displayName: "Final Interview",
        color: "Gray"
    },
    "OFFER": {
        displayName: "Offer",
        color: "Gray"
    },
    "ACCEPTED": {
        displayName: "Accepted",
        color: "Green"
    },
    "REJECTED": {
        displayName: "Rejected",
        color: "Red"
    },
    "WITHDRAWN": {
        displayName: "Withdrawn",
        color: "Gray"
    }
};