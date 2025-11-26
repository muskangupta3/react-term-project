import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/database";

interface LoginPageProps {
  searchParams?: { error?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const error = searchParams?.error;

  async function handleLogin(formData: FormData) {
    "use server";

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const foundUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!foundUser || foundUser.password !== password) {
      redirect("/login");
    }

    (await cookies()).set("user_id", String(foundUser.id));
    redirect("/");
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-600 mb-4 text-center font-medium">{error}</div>
        )}
        <form className="space-y-4" action={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              name="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
