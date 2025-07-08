import Logo from '../utility/Logo';

const Footer = () => {
    return (
        <footer className='bg-slate-900 text-slate-100 py-8 text-center flex flex-col gap-3  px-3'>
            <h6>Habits compound over time and the only way to achieve that is to</h6>

            <Logo logoColor={'text-green-100'} />

            <div>
                Developed out of ❤ by{' '}
                <span className='text-green-500 cursor-pointer'>Clifford</span>
            </div>
        </footer>
    );
};

export default Footer;
