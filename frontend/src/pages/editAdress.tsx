/**
 * v0 by Vercel.
 * @see https://v0.dev/t/beB0MS8zEKH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function EditAddress() {
  return (
    <Card className="max-w-md mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Address Details</CardTitle>
        <CardDescription>Please enter your address information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="area">Area</Label>
            <Input id="area" placeholder="Downtown" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="California" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" type="number" placeholder="12345" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  )
}