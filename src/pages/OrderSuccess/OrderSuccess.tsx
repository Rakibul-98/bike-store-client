import successGif from '../../assets/gif/success.gif';

export default function OrderSuccess() {
  return (
    <div className='min-h-[70vh] my-10 flex justify-center items-center'>
          <div className='max-w-lg'>
          <img className='' src={successGif} alt="" />
      </div>
    </div>
  )
}
