import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { promisify } from "util";

const form = formidable({ multiples: false, keepExtensions: true });

export const parseForm = async (req: NextRequest) =>
  new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
