export interface ITransaction {
    type : transactionType;
    amount : string;
    timeStamp : number;
    address : string;
    fee : number;
    id : number;
}

//not sure about ballot;
export enum transactionType {
    activate_account, double_baking_evidence, double_endorsement_evidence, seed_nonce_revelation, transaction, origination, delegation, reveal, endorsement, proposals, seed_slash, unfreeze, airdrop, invoice
}
