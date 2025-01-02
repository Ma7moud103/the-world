"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in ");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("please provide a valid national id");
  const updateData = { countryFlag, nationalID, nationality };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in ");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in ");

  const updatedDate = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000)
  };
  const bookingId = Number(formData.get("bookingId"));
  const { error } = await supabase
    .from("bookings")
    .update(updatedDate)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in ");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed"
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
