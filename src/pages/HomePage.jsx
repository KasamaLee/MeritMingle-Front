import { useState } from "react"
import Modal from "../components/Modal"
import LoginAndRegister from "../features/auth/LoginAndRegister"
import { useAuth } from "../hooks/use-auth"

export default function HomePage() {


    const [whichProduct, setWhichProduct] = useState('')
    const { isOpen, setIsOpen } = useAuth();

    return (
        <>
            <div className=" bg-gray-200 ">
                <div className="container flex justify-between py-6">

                    <div className="flex flex-col items-start justify-center max-w-md gap-6">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl text-gray-600">งานบุญ งานบวช ขึ้นบ้านใหม่ เสริมสิริมงคล</h1>
                            <p className="text-lg"> ให้ MeritMingle ช่วยดูแลวันสำคัญของคุณ</p>
                        </div>
                        <button className="cta-button">นิมนต์ now</button>
                    </div>
                    <img className="object-cover w-2/5 rounded-2xl " src="https://f.ptcdn.info/723/061/000/pkltx5avwSxPyzfJVDT-o.jpg" alt="hero-image" />
                </div>
            </div>
            <div className="container py-16 grid grid-cols-2 gap-4">
                <div className="bg-gray-300 flex justify-center items-center p-10">งานบวช</div>
                <div className="bg-gray-300 flex justify-center items-center p-10">งานแต่งงาน</div>
                <div className="bg-gray-300 flex justify-center items-center p-10">เสริมมงคลกิจการ</div>
                <div className="bg-gray-300 flex justify-center items-center p-10">ขึ้นบ้านใหม่</div>
                <Modal open={isOpen} onCloseModal={() => setIsOpen(false)}>
                    <LoginAndRegister onCloseModal={() => setIsOpen(false)} />
                </Modal>
            </div>

        </>
    )
}
