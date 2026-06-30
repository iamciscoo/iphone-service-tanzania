import { NextResponse } from "next/server";

type BookingPayload = {
  name?: string;
  phone?: string;
  date?: string;
  model?: string;
  device?: string;
  service?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as BookingPayload;
  const required = [body.name, body.phone, body.date, body.model, body.device, body.service];

  if (required.some((value) => !value || !value.trim())) {
    return NextResponse.json({ error: "Missing required booking details" }, { status: 400 });
  }

  // Integration seam: replace this response with CRM, database, or messaging delivery.
  return NextResponse.json({ accepted: true }, { status: 202 });
}
