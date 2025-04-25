import Image from "next/image"

export default function SocialMediaLogo() {
    return (
        <div className='flex gap-2.5 items-center'>
        <a href='https://www.instagram.com/aethrastudio.id?igsh=NHAycWY3aGZmd3c=' rel="noopener noreferrer" target="_blank"><Image src={'/images/homeAssets/instagram.svg'} width={24} height={24} className='w-5' alt='instagram' /></a>
        <a href='https://www.tiktok.com/@aethra.studio26?_t=ZS-8vVztYBtQuY&_r=1' rel="noopener noreferrer" target="_blank"><Image src={'/images/homeAssets/tiktok.svg'} width={24} height={24} className='w-5' alt='tiktok' /></a>
        <a href='https://youtube.com/@aethrastudio?si=9mrK3X_Xy-jIR9yP' rel="noopener noreferrer" target='_blank'><Image src={'/images/homeAssets/youtube.svg'} width={24} height={24} className='w-5' alt='youtube' /></a>
      </div>
    )
}