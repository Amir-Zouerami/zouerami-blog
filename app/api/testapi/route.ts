export async function GET(request: Request) {
  return Response.json('GETTTT');
}

export async function POST(request: Request) {
  const req = await request.formData();

  const formData: { [key: string]: string | File } = {};

  for (const [key, value] of req) {
    formData[key] = value;
  }

  // console.log(formData);

  // console.log(req);
  return Response.json(formData);
}
