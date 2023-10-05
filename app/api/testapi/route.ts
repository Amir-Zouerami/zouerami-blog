export async function GET(request: Request) {
  return Response.json('GETTTT');
}

export async function POST(request: Request) {
  const req = await request.formData();

  const formData: { [key: string]: string | File } = {};

  for (const [key, value] of req) {
    formData[key] = value;
  }

  console.log(formData);

  return Response.json(formData);
  // console.log(request);
}
