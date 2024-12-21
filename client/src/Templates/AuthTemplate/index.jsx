import "./styles.scss";

function AuthTemplate({children}) {
    return (
        <>
            <main className="auth-container">
                <section className="brand">
                    <figure>
                        <img
                            src="/logos/main/AttendanceHeroDark.svg"
                            alt="AttendenceHero"
                            title="AttendenceHero"
                            aria-roledescription="Logotipo da AttendanceHero" />
                        <figcaption hidden={true} aria-hidden={true}>
                            AttendanceHero
                        </figcaption>
                    </figure>
                </section>

                <div className="wrapper">
                    <section className="form-auth">
                        {children}
                    </section>
                </div>
            </main>
        </>
    );
}

export default AuthTemplate;
