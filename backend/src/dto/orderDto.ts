export class OrderDto {
  details: string;
  price?: number;
  payed?: boolean;
}

// AFAIK nestjs uses the DTOs for validation.
// Therefore classes which exist at runtime should be used.
// Howerver it would be great to be able to use TS utility classes (e.g. Partial<someDto>) here:
export class PartialOrderDto {
  details?: string;
  price?: number;
  payed?: boolean;
}
