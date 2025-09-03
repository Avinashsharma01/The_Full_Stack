import nodemailer from "nodemailer"

const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER as string,
            pass: process.env.EMAIL_PASS as string
        }
    })

    await transporter.sendMail({
        to,
        from: process.env.EMAIL_USER as string,
        subject,
        text
    })
}


export default sendEmail