import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

export default function VerifyEmail({ nombre = "Usuario", url = "#" }) {
    return (
        <Html>
            <Head />

            <Preview>Verifica tu correo y asegura tu cuenta</Preview>

            <Tailwind>
                <Body className="bg-gray-100 font-sans py-10">
                    <Container className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow">

                        {/* Logo / Header */}
                        <Section className="bg-blue-600 text-center p-6">
                            <Img
                                src="https://via.placeholder.com/120x40"
                                alt="Logo"
                                className="mx-auto"
                            />
                        </Section>

                        {/* Mensaje */}
                        <Section className="p-6 text-center">
                            <Text className="text-xl font-bold text-gray-800">
                                Hola {nombre}
                            </Text>

                            <Text className="text-gray-600 mt-3">
                                Gracias por registrarte. Para activar tu cuenta, necesitas verificar tu correo electrónico.
                            </Text>
                        </Section>

                        {/* Botón */}
                        <Section className="text-center px-6">
                            <Button
                                href={url}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                            >
                                Verificar Correo
                            </Button>
                        </Section>

                        {/* Seguridad */}
                        <Section className="px-6 mt-6">
                            <Text className="text-xs text-gray-500 text-center">
                                🔒 Este enlace es seguro y expirará en 10 minutos.
                                Si no solicitaste esta acción, puedes ignorar este mensaje.
                            </Text>
                        </Section>

                        <Hr className="my-6 border-gray-200" />

                        {/* Footer */}
                        <Section className="px-6 pb-6 text-center">
                            <Text className="text-gray-600 text-sm">
                                Saludos,<br />
                                <strong>Equipo de Soporte</strong>
                            </Text>

                            <Text className="text-xs text-gray-400 mt-4">
                                Nunca compartas este enlace con nadie.
                            </Text>
                        </Section>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}