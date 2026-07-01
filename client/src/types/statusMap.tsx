interface StatusConfig {
    displayName: string;
    color: string;
}

export const statusMapping: Record<string, StatusConfig> = { 
    "APPLIED": {
        displayName: "Applied",
        color: "#98c8ff"
    },
    "RECRUITER_SCREEN": {
        displayName: "Recruiter Screen",
        color: "#cae3ff"
    },
    "TECHNICAL_INTERVIEW": {
        displayName: "Technical Interview",
        color: "#ff8f4f"
    },
    "FINAL_INTERVIEW": {
        displayName: "Final Interview",
        color: "#b260ff"
    },
    "OFFER": {
        displayName: "Offer",
        color: "#a7ffbd"
    },
    "ACCEPTED": {
        displayName: "Accepted",
        color: "#32cf47"
    },
    "REJECTED": {
        displayName: "Rejected",
        color: "#F15050"
    },
    "WITHDRAWN": {
        displayName: "Withdrawn",
        color: "#bdbdbd"
    }
};