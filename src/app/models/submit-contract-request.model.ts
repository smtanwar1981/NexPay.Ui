export interface SubmitContractRequest {
    contractId?: string;
    fromCurrencyCode: string;
    toCurrencyCode: string;
    conversionRate: number;
    initialAmount: number;
    finalAmount: number;
    contractStatus: string;
    userEmail?: string;
}