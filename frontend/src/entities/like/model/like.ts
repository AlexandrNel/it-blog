export interface Like {
  id: string;
  userId: string;
  entityType: "article" | "comment";
  entityId: string;
}
