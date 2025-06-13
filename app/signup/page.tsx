// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "hospital_admin" | "bloodbank_admin">("user");
  const [isLoading, setIsLoading] = useState(false);

  // Hospital admin fields
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const [hospitalContact, setHospitalContact] = useState("");
  const [icuBeds, setIcuBeds] = useState("");
  const [generalBeds, setGeneralBeds] = useState("");
  const [emergencyBeds, setEmergencyBeds] = useState("");
  const [pediatricBeds, setPediatricBeds] = useState("");

  // Blood bank admin fields
  const [bloodBankName, setBloodBankName] = useState("");
  const [bloodBankLocation, setBloodBankLocation] = useState("");
  const [bloodBankContact, setBloodBankContact] = useState("");
  const [aPosStock, setAPosStock] = useState("");
  const [aNegStock, setANegStock] = useState("");
  const [bPosStock, setBPosStock] = useState("");
  const [bNegStock, setBNegStock] = useState("");
  const [abPosStock, setAbPosStock] = useState("");
  const [abNegStock, setAbNegStock] = useState("");
  const [oPosStock, setOPosStock] = useState("");
  const [oNegStock, setONegStock] = useState("");

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let additionalInfo = {};

      if (role === "hospital_admin") {
        additionalInfo = {
          name: hospitalName,
          location: hospitalLocation,
          contact: hospitalContact,
          beds: {
            icu: { available: parseInt(icuBeds) || 0, occupied: 0 },
            general: { available: parseInt(generalBeds) || 0, occupied: 0 },
            emergency: { available: parseInt(emergencyBeds) || 0, occupied: 0 },
            pediatric: { available: parseInt(pediatricBeds) || 0, occupied: 0 },
          },
        };
      } else if (role === "bloodbank_admin") {
        additionalInfo = {
          name: bloodBankName,
          location: bloodBankLocation,
          contact: bloodBankContact,
          stock: {
            A_pos: parseInt(aPosStock) || 0,
            A_neg: parseInt(aNegStock) || 0,
            B_pos: parseInt(bPosStock) || 0,
            B_neg: parseInt(bNegStock) || 0,
            AB_pos: parseInt(abPosStock) || 0,
            AB_neg: parseInt(abNegStock) || 0,
            O_pos: parseInt(oPosStock) || 0,
            O_neg: parseInt(oNegStock) || 0,
          },
        };
      }

      await register(
        firstName,
        lastName,
        email,
        password,
        role,
        additionalInfo
      );

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description:
          "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value: "user" | "hospital_admin" | "bloodbank_admin") => setRole(value)}
                  id="role"
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hospital_admin" id="hospital_admin" />
                    <Label htmlFor="hospital_admin">Hospital Admin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bloodbank_admin" id="bloodbank_admin" />
                    <Label htmlFor="bloodbank_admin">Blood Bank Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {role === "hospital_admin" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Hospital Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      required
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalLocation">Location</Label>
                    <Input
                      id="hospitalLocation"
                      required
                      value={hospitalLocation}
                      onChange={(e) => setHospitalLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalContact">Contact Number</Label>
                    <Input
                      id="hospitalContact"
                      required
                      type="tel"
                      value={hospitalContact}
                      onChange={(e) => setHospitalContact(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="icuBeds">ICU Beds</Label>
                      <Input
                        id="icuBeds"
                        type="number"
                        min="0"
                        value={icuBeds}
                        onChange={(e) => setIcuBeds(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="generalBeds">General Beds</Label>
                      <Input
                        id="generalBeds"
                        type="number"
                        min="0"
                        value={generalBeds}
                        onChange={(e) => setGeneralBeds(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyBeds">Emergency Beds</Label>
                      <Input
                        id="emergencyBeds"
                        type="number"
                        min="0"
                        value={emergencyBeds}
                        onChange={(e) => setEmergencyBeds(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pediatricBeds">Pediatric Beds</Label>
                      <Input
                        id="pediatricBeds"
                        type="number"
                        min="0"
                        value={pediatricBeds}
                        onChange={(e) => setPediatricBeds(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {role === "bloodbank_admin" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Blood Bank Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="bloodBankName">Blood Bank Name</Label>
                    <Input
                      id="bloodBankName"
                      required
                      value={bloodBankName}
                      onChange={(e) => setBloodBankName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodBankLocation">Location</Label>
                    <Input
                      id="bloodBankLocation"
                      required
                      value={bloodBankLocation}
                      onChange={(e) => setBloodBankLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodBankContact">Contact Number</Label>
                    <Input
                      id="bloodBankContact"
                      required
                      type="tel"
                      value={bloodBankContact}
                      onChange={(e) => setBloodBankContact(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aPosStock">A+ Stock</Label>
                      <Input
                        id="aPosStock"
                        type="number"
                        min="0"
                        value={aPosStock}
                        onChange={(e) => setAPosStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aNegStock">A- Stock</Label>
                      <Input
                        id="aNegStock"
                        type="number"
                        min="0"
                        value={aNegStock}
                        onChange={(e) => setANegStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bPosStock">B+ Stock</Label>
                      <Input
                        id="bPosStock"
                        type="number"
                        min="0"
                        value={bPosStock}
                        onChange={(e) => setBPosStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bNegStock">B- Stock</Label>
                      <Input
                        id="bNegStock"
                        type="number"
                        min="0"
                        value={bNegStock}
                        onChange={(e) => setBNegStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="abPosStock">AB+ Stock</Label>
                      <Input
                        id="abPosStock"
                        type="number"
                        min="0"
                        value={abPosStock}
                        onChange={(e) => setAbPosStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="abNegStock">AB- Stock</Label>
                      <Input
                        id="abNegStock"
                        type="number"
                        min="0"
                        value={abNegStock}
                        onChange={(e) => setAbNegStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oPosStock">O+ Stock</Label>
                      <Input
                        id="oPosStock"
                        type="number"
                        min="0"
                        value={oPosStock}
                        onChange={(e) => setOPosStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oNegStock">O- Stock</Label>
                      <Input
                        id="oNegStock"
                        type="number"
                        min="0"
                        value={oNegStock}
                        onChange={(e) => setONegStock(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
