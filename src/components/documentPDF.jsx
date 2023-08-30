import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer'
// import { AiFillCaretRight } from 'react-icons/ai'
import { toPng } from 'html-to-image'
import { colors } from '../constants/constants.js'

// Register font
Font.register({ family: 'Bebas Neue', src: '/fonts/BebasNeue-Regular.ttf' })
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Thin.ttf', fontWeight: 100 }, // font-style: normal, font-weight: normal
    { src: '/fonts/Roboto-ThinItalic.ttf', fontStyle: 'italic', fontWeight: 100 },
    { src: '/fonts/Roboto-Light.ttf', fontWeight: 300 }, // font-style: normal, font-weight: normal
    { src: '/fonts/Roboto-LightItalic.ttf', fontStyle: 'italic', fontWeight: 300 },
    { src: '/fonts/Roboto-Regular.ttf' }, // font-style: normal, font-weight: normal
    { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' },
    { src: '/fonts/Roboto-Medium.ttf', fontWeight: 500 }, // font-style: normal, font-weight: normal
    { src: '/fonts/Roboto-MediumItalic.ttf', fontStyle: 'italic', fontWeight: 500 },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 }, // font-style: normal, font-weight: normal
    { src: '/fonts/Roboto-BoldItalic.ttf', fontStyle: 'italic', fontWeight: 700 },
    { src: '/fonts/Roboto-Black.ttf', fontWeight: 900 }, // font-style: normal, font-weight: normal
    { src: '/fonts/Roboto-BlackItalic.ttf', fontStyle: 'italic', fontWeight: 900 }
  ]
})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  container: {
    margin: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
    // flexGrow: 1
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1 // Colocar la imagen en el fondo
  },
  title: {
    fontFamily: 'Bebas Neue',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 'normal',
    fontFamily: 'Bebas Neue',
    color: '#fff',
    letterSpacing: 1.5
  },
  text: {
    fontSize: 24,
    marginLeft: 15,
    fontFamily: 'Bebas Neue'
  },
  subtext: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 15,
    fontFamily: 'Bebas Neue'
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1

  },
  cell: {
    flex: 1,
    margin: 20,
    borderLeft: '1px solid grey'
  }
})

// Create Document Component
export const DocumentPDF = ({ radarChartRef, similarPlayersRef, normalDistributionChartsRef, player }) => {
  const generateImage = async (ref) => {
    const image = await toPng(ref?.current, { cacheBust: false })
    return image
  }

  return (
    <Document>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <Image alt='bg-image' src='/stadium.jpg' style={styles.background} />
        <View style={styles.container}>
          <Text style={[styles.title]}>
            Datamoroni
          </Text>
          <Image alt='divider' src='/divider.png' style={{ width: '5%', height: '80%' }} />
          <Text style={styles.subtitle}>
            Professional football report
          </Text>
        </View>
      </Page>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.container}>
          <Text style={[styles.subtitle, { borderTop: `2px solid ${colors.primary}`, color: colors.quinary }]}>
            Overview
          </Text>
        </View>
        <View style={{ width: '95%', borderTop: `2px solid ${colors.primary}`, marginLeft: 20 }} />
        <View style={styles.row}>
          <View style={styles.cell}>
            <View style={[styles.container, { alignItems: 'flex-end', marginBottom: 0, paddingBottom: 0 }]}>
              <Image alt='player-image' src='/player_avatar.png' style={{ width: '25%' }} />
              <View>
                <Text style={styles.text}>{player.name} | {player.position}</Text>
                <Text style={styles.subtext}>{player.citizenship} ({player.age})</Text>
              </View>
            </View>
            <View style={{ display: 'flex', width: '100%', height: '80%', flexDirection: 'column', marginLeft: 20, marginTop: 20, justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.quaternary, backgroundColor: colors.primary, borderRadius: 5, padding: 5 }}>CLUB</Text>
                {/* <View style={{ borderBottom: `2px dashed ${colors.primary}`, flexGrow: 1 }} /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.secondary }}>{player.club.toUpperCase()}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.quaternary, backgroundColor: colors.primary, borderRadius: 5, padding: 5 }}>MIN. JUG</Text>
                {/* <View style={{ borderBottom: `2px dashed ${colors.primary}`, flexGrow: 1 }} /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.secondary }}>{player.minutesPlayed}MIN</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.quaternary, backgroundColor: colors.primary, borderRadius: 5, padding: 5 }}>VALOR</Text>
                {/* <View style={{ borderBottom: `2px dashed ${colors.primary}`, flexGrow: 1 }} /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.secondary }}>{player.marketValue / 1000000}M $</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.quaternary, backgroundColor: colors.primary, borderRadius: 5, padding: 5 }}>PIE HÁBIL</Text>
                {/* <View style={{ borderBottom: `2px dashed ${colors.primary}`, flexGrow: 1 }} /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.secondary }}>{player.foot.toUpperCase()}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.quaternary, backgroundColor: colors.primary, borderRadius: 5, padding: 5 }}>ALTURA</Text>
                {/* <View style={{ borderBottom: `2px dashed ${colors.primary}`, flexGrow: 1 }} /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.secondary }}>{player.height / 100}M</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.quaternary, backgroundColor: colors.primary, borderRadius: 5, padding: 5 }}>PESO</Text>
                {/* <View style={{ borderBottom: `2px dashed ${colors.primary}`, flexGrow: 1 }} /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'medium', color: colors.secondary }}>{player.weight}KG</Text>
              </View>
            </View>
          </View>
          <View style={styles.cell}>
            {/* <View style={[styles.container, { alignItems: 'flex-end', marginBottom: 0, paddingBottom: 0 }]}>
              <Image alt='player-image' src='/ranking.png' style={{ width: '100%' }} />
            </View> */}
          </View>
          <View style={styles.cell}>
            <View style={{ margin: 10, paddingTop: 10, alignItems: 'flex-start' }}>
              <Text style={[styles.text, { letterSpacing: '1', marginLeft: 10 }]}>
                Jugadores Similares
              </Text>
              <Image alt='player-image' src={generateImage(similarPlayersRef)} style={{ objectFit: 'cover', marginLeft: 10, marginTop: 20 }} />
            </View>
          </View>
        </View>
      </Page>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.container}>
          <Text style={[styles.subtitle, { borderTop: `2px solid ${colors.primary}`, color: colors.quinary }]}>
            Gráfico de estadísticas
          </Text>
        </View>
        <Image alt='chart' src={generateImage(radarChartRef)} style={{ width: '100%', height: '80%', objectFit: 'cover', paddingLeft: '10%' }} />
      </Page>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.container}>
          <Text style={[styles.subtitle, { borderTop: `2px solid ${colors.primary}`, color: colors.quinary }]}>
            Gráficos de distribución
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <Image alt='chart' src='/distribution.jpg' style={{ width: '100%', height: '100%' }} />
        </View>
      </Page>
    </Document>
  )
}
