'use server';

import EmailTemplate from "@/components/payment/EmailTemplate";
import { createUser, findUsersByCredentials, getEventById, updateGoing, updateInterest } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);

    redirect("/login");
}

async function performLogin(formData) {
    try {
        const credential = {};
        credential.email = formData.get('email');
        credential.password = formData.get('password');
        const found = await findUsersByCredentials(credential);
        return found;
    } catch (err) {
        throw err;
    }
}

async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterest(eventId, authId);
        revalidatePath("/");
    } catch (err) {

    }
}

async function addGoingEvent(eventId, user) {
    console.log(eventId, user, "from addGoingEvent");
    try {
        await updateGoing(eventId, user?.id);
        await sendEmail(eventId, user);
    } catch (err) {
        throw err;
    }

    revalidatePath("/");
    redirect("/");
}

async function sendEmail(eventId, user) {
    console.log("calledddddddddd sendEmail");
    try {
        const event = await getEventById(eventId);
        const resend = new Resend(process.env.RESEND_API_KEY);
        const message = `Dear ${user.name}, you have been successfully registered for the event, ${event.name}. Please carry this email and your official id to the venue. We're excited to have you here!`

        const {data, error} = await resend.emails.send({
            from: 'Your friendly neighbor <noreply@resend.dev>',
            to: user?.email,
            subject: "Successfully registered for the event!",
            react: EmailTemplate({ message })
        })
        console.log(data, error);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export {
    registerUser,
    performLogin,
    addInterestedEvent,
    addGoingEvent,
    sendEmail
}