import { Heading, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import SEO from '../components/seo';
import Layout from '../layouts/default-layout';

const NotFoundPage = (): JSX.Element => (
    <Layout>
        <SEO title="Gebruiksvoorwaarden" />
        <Stack spacing={10}>
            <Heading as="h1" size='xl' textTransform="uppercase">COOKIES & PRIVACY</Heading>

            <Heading size="xl">Wat is een cookie?</Heading>
            <Text fontSize="xl">
                De Hersenvulsel website bestaat uit verschillende webpagina’s die worden beheerd door Hersenvulsel. De website wordt u aangeboden onder de voorwaarde dat u deze accepteert zonder de hierin vermelde voorwaarden, bepalingen en mededelingen. Uw gebruik van de Hersenvulsel website vormt uw akkoord met al deze voorwaarden, bepalingen en mededelingen te wijzigen.
            </Text>

            <Heading size="xl">En Hersenvulsel gebruikt dat?</Heading>
            <Text fontSize="xl">
                Eerlijk? Eigenlijk zijn wij zelf niet echt fan van het tracken van personen met behulp van cookies. Natuurlijk zijn cookies niet zomaar uitgevonden. Ze hebben wel degelijk een functioneel nut. Vandaar dat wij inderdaad ook cookies gebruiken. Toch proberen we het aantal trackers op deze website tot een minimum te beperken om jouw persoonlijke gegevens zo veel mogelijk te beschermen.
            </Text>

            <Heading size="xl">Waarvoor gebruikt Hersenvulsel cookies?</Heading>
            <Text fontSize="xl">
                Hersenvulsel gebruikt twéé soorten cookies: het Google Analytics cookie en een Cookie Consent cookie.
            </Text>

            <Text fontSize="xl">
                Google Analytics is een platform van Google dat wij gebruiken om het verkeer op onze website te meten. Zo kunnen wij zien welke onderwerpen in de smaak vallen of - tegenovergesteld - minder vaak gelezen worden. Met die data gaan wij dan aan de slag om interessantere artikels te schrijven voor onze doelgroep. Wij hebben Analytics zo geconfigureerd dat al de (anonieme) gebruikersdata die opgeslagen wordt niet kan gebruikt worden door derden of andere diensten van Google.
            </Text>

            <Text fontSize="xl">
                Cookie Consent is een makkelijke oplossing om in orde te zijn met de Europese Cookie Wetgeving. Dit cookie wordt gebruikt om te onthouden of jij al dan niet onze cookievoorwaarden gelezen hebt. Het is dus een cookie dat wij MOETEN gebruiken. Go Figure.
            </Text>

            <Heading size="xl">Houden jullie nog andere persoonlijke gegevens bij?</Heading>
            <Text fontSize="xl">
                Nope, helemaal niks. Wij hebben geen databases, geen mailinglists, geen verjaardagskalenders, ... Niks. Hersenvulsel is een minimalistich project dat zich probeert te onderscheiden door met een zo klein mogelijke infrastructuur zo veel mogelijk goede en gratis content te leveren. Hopelijk kunnen jullie dat appreciëren.
            </Text>
        </Stack>
    </Layout>
);

export default NotFoundPage;
