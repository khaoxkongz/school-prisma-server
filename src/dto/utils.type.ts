type Empty = {};

type ID = { id: string };

type MessageReason = { message?: string };

type ErrorReason = MessageReason & { error?: string };

export { ID, Empty, MessageReason, ErrorReason };
