export interface FormStatus {
    name: string;
    url: string;
    status: "pending" | "done"; // Extend this if there are other possible statuses
}

export interface DefaultFormStatuses {
    staff_joining?: FormStatus;
    id_card?: FormStatus;
    staff_family_members?: FormStatus;
    bank_mandate?: FormStatus;
    nomination_declaration_form1?: FormStatus;
    gratuity_form?: FormStatus;
    nomination_declaration_form2?: FormStatus;
}
