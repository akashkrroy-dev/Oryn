import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { users } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function POST() {
   const session = await getServerSession(authOptions);

   if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const [user] = await db
         .insert(users)
         .values({
            email: session.user.email,
            name: session.user.name ?? null,
         })
         .onConflictDoUpdate({
            target: users.email,
            set: {
               name: session.user.name ?? null,
            },
         })
         .returning({
            id: users.id,
            inserted: sql<boolean>`(xmax = 0)`,
         });

      
      return NextResponse.json({ ok: true, user }, { status: user.inserted ? 201 : 200 });
   } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Server side Error" }, { status: 500 });
   }
}