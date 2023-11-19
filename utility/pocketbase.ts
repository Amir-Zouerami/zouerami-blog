import Pocketbase from 'pocketbase';
import type PBType from 'pocketbase';

let pb: PBType;

export const serverPB = () => {
  if (!pb) {
    pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  }

  return pb;
};

export const adminPB = async () => {
  if (!pb) {
    pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );
  }

  return pb;
};
