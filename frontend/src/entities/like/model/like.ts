export interface Like {
  id: string;
  userId: string;
  entityType: "post" | "comment";
  entityId: string;
}
