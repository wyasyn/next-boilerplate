"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateUser } from "@/app/actions/user";
import { Textarea } from "./ui/textarea";

export default function UpdateUserForm({
  id,
  firstName,
  lastName,
  username,
  email,
  bio,
}: {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
}) {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  async function editUserClient(formData: FormData) {
    try {
      const res = await updateUser(id, formData);
      if (res.success) {
        setSuccess(res.success);
      }
      if (res.error) {
        setError(res.error);
      }
    } catch (error) {
      throw new Error();
    }
  }
  return (
    <form action={editUserClient}>
      <div className=" w-full mb-3 flex items-center justify-end ">
        <Button type="submit" variant="outline" size="sm" className=" ml-auto ">
          Update Info
        </Button>
        <input name="orderId" type="hidden" value={id} />
      </div>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <h2>Edit your information</h2>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-6 ">
            <div className=" grid gap-2 sm:grid-cols-2 ">
              <div className="grid gap-3 py-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  name="firstName"
                  id="firstName"
                  defaultValue={firstName}
                  type="text"
                  className="w-full"
                />
              </div>
              <div className="grid gap-3 py-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  name="lastName"
                  id="lastName"
                  defaultValue={lastName}
                  type="text"
                  className="w-full"
                />
              </div>
            </div>
            <div className=" grid gap-2 sm:grid-cols-2 ">
              <div className="grid gap-3 py-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  defaultValue={username}
                  type="text"
                  className="w-full"
                />
              </div>
              <div className="grid gap-3 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  defaultValue={email}
                  type="email"
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid gap-3 py-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                name="bio"
                id="bio"
                defaultValue={bio}
                className="w-full"
              />
            </div>
          </div>
          {success && (
            <p className=" border border-emerald-500 bg-emerald-300 font-semibold text-emerald-800 px-3 py-2 rounded-lg mt-8 ">
              {success}
            </p>
          )}

          {error && (
            <p className=" border border-red-500 bg-red-300 font-semibold text-red-800 px-3 py-2 rounded-lg mt-8 ">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
