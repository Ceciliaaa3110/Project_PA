export enum TrafficType {
    BENIGN = "BENIGN",
    DOS = "DoS",
    BRUTE_FORCE = "BRUTE_FORCE",
    BLOCKED = "BLOCKED"
}

export enum TrafficDecision {
    ALLOW = "ALLOW",
    TEMP_BLOCK = "TEMP_BLOCK",
    ALERT = "ALERT"
}