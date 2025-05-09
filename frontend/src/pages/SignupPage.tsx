export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-deep-purple flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-mid-orange mb-8">Signup</h1>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs mb-1 text-white">Email</label>
                            <input type="email" placeholder="example@emaol.com" className="w-full px-4 py-2 rounded bg-white text-black"/>
                        </div>
                    </form>
                </div>
            </div>
            <div></div>
        </div>
    );
}