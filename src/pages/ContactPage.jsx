import ContactUs from '../assets/ContactUs.svg'

export default function ContactPage() {
  return (
    <div className="container py-20">
      <div className="flex justify-center items-center gap-20">
        <img src={ContactUs} className='w-72' />
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <h4 className="flex text-2xl">Tel.</h4>
            <span className="text-xl">098-888-8888</span>
          </div>

          <div className="flex items-baseline gap-2">
            <h4 className="flex text-2xl">Email:</h4>
            <span className="text-xl">Merit_mingle@gmail.com</span>
          </div>

        </div>
      </div>
    </div>
  )
}
