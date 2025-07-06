import { cn } from "../../lib/utils"
import { Button } from "../button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Chart/card"
import { Input } from "../input"
import { Label } from "../label"
import { useNavigate } from "react-router-dom"

export function SignupComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate=useNavigate();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center py-2 text-xl font-bold">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
               <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="demo"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" placeholder="********" type="password" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="password" placeholder="********" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => navigate('/dashboard')}  className="w-full">
                  Sign Up
                </Button>
              
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
