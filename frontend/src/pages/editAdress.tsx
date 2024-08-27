import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Extend Address type to include consignmentNo
interface Address {
  consignmentNo?: string;
  addressLine1?: string;
  addressLine2?: string;
  area?: string;
  state?: string;
  city?: string;
  pincode?: string;
}

const EditAddress: React.FC = () => {
  const { uniqueId } = useParams<{ uniqueId: string }>();
  const [post, setPost] = useState<Address | null>(null);
  const [address, setAddress] = useState<Address>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/validate-link/${uniqueId}`);
        const data = await response.json();
        if (data.valid) {
          setPost(data.post);
        } else {
          setError('Link has expired or is invalid');
        }
      } catch (error) {
        // Use the error variable here
        setError('An error occurred while fetching the post');
        console.error('Fetch error:', error);
      }
    };

    fetchPost();
  }, [uniqueId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!post?.consignmentNo) {
      alert('Consignment number is missing');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/update-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consignmentNo: post.consignmentNo, ...address }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Address updated successfully');
      } else {
        alert(data.error || 'Failed to update address');
      }
    } catch (error) {
      // Use the error variable here
      alert('An error occurred while updating the address');
      console.error('Submit error:', error);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Address</CardTitle>
        <CardDescription>Please enter your updated address information.</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input id="addressLine1" defaultValue={post?.addressLine1 || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input id="addressLine2" defaultValue={post?.addressLine2 || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">Area</Label>
              <Input id="area" defaultValue={post?.area || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue={post?.state || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue={post?.city || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" type="text" defaultValue={post?.pincode || ''} onChange={handleChange} />
            </div>
            <CardFooter className="flex justify-end">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default EditAddress;
