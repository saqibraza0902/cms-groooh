import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const ref = doc(db, "Pages", "SERVICES");
    const snapshot = await getDoc(ref);
    const data: any = { id: snapshot.id, ...snapshot.data() };
    const refined_data = [
      {
        title: data.SERVICE_1.title,
        icon: data.SERVICE_1.icon,
        id: data.SERVICE_1.id,
        sub_services: data.SERVICE_1.services.map((el: any) => {
          return { title: el.title, url: el.url };
        }),
      },
      {
        title: data.SERVICE_2.title,
        icon: data.SERVICE_2.icon,
        id: data.SERVICE_2.id,
        sub_services: data.SERVICE_2.services.map((el: any) => {
          return { title: el.title, url: el.url };
        }),
      },
      {
        title: data.SERVICE_3.title,
        icon: data.SERVICE_3.icon,
        id: data.SERVICE_3.id,
        sub_services: data.SERVICE_3.services.map((el: any) => {
          return { title: el.title, url: el.url };
        }),
      },
    ];
    return new NextResponse(JSON.stringify(refined_data), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }));
  }
};
