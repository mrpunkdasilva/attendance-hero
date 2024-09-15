import ImagePolyfillForm from "../../assets/images/polygon.svg";
import "./styles.scss";

function AuthTemplate({children}) {
    return (
        <>
            {/*
                @name AuthTemplate
                @description This is the HTML structure for the AuthTemplate component. It consists of a main container with a brand section and a wrapper section that contains the authentication form, and a form polyfill.
            */}
            <main className="auth-container">
                {/*
                    @name Brand
                */}
                <section className="brand">
                    {/*
                        @name Brand Logo
                        @description This is the logo for the application.
                    */}
                    <figure>
                        <img
                            src="/logos/main/AttendanceHeroDark.svg"
                            alt="AttendenceHero"
                            title="AttendenceHero"
                            aria-roledescription="Logotipo da AttendanceHero" />
                        <figcaption hidden={true}>
                            AttendanceHero
                        </figcaption>
                    </figure>
                </section>


                {/*
                    @name Wrapper Authentication
                */}
                <div className="wrapper">
                    {/*
                        @name Authentication Form
                        @description This section contains the form for authentication.
                    */}
                    <section className="form-auth">
                        {/*
                            @name Authentication Form Component
                            @description This is the actual form for authentication.
                        */}
                        {children}
                    </section>

                    {/*
                        @name Form Poly Fill
                    */}
                    <div className="form-polyfill">
                        <img src={ImagePolyfillForm} alt="Forma Geometria"/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AuthTemplate;
