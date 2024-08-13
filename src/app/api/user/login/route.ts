import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateToken } from "@/utill/jwtTokenhelper";

export async function POST(req: Request, res: Response) {
    try {
        let reqBody = await req.json();
        const prisma = new PrismaClient();
        const result = await prisma.users.findUnique({
        where: reqBody,
    });
    if(!result?.email && !result?.id){
        return NextResponse.json({ status: "fail", data: result });
    }else{
    let token = await CreateToken(result?.email, result?.id);
    let expireduration = new Date(Date.now()+24*60*60*1000);
    const cookieString  = `token=${token}; expires=${expireduration.toUTCString()};path=/`;
    return NextResponse.json(
        { status: "success", data: token },
        { status: 200, headers: { "set-cookie": cookieString } }
    );
    }
    } catch (e) {
        return NextResponse.json({ status: "fail", data: e });
    }
    }
