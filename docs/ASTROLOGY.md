# Calculation notes

## Coordinate convention

Longitudes are normalized to `[0, 360)` degrees. Sign index zero is Aries; each sign spans 30 degrees. Nakshatra index zero is Ashwini; each span is exactly `40/3` degrees and each pada exactly `10/3` degrees. The chart layer subtracts a Lahiri/Chitrapaksha ayanamsa from tropical ecliptic positions.

## Ephemeris

Planet positions are obtained from `astronomy-engine` geocentric vectors and its ecliptic-of-date conversion. The current calculation package uses a polynomial ayanamsa approximation anchored at J2000; it is not a substitute for a certified Swiss Ephemeris implementation. The north node uses a mean-node polynomial; Ketu is placed 180 degrees opposite. Planet motion is estimated by a centered one-hour difference.

## Houses and time

The ascendant uses local sidereal time, date obliquity and geographic latitude; house placement is whole-sign. Input time is interpreted using the explicit UTC offset supplied with the location. Daylight-saving transitions and historical time-zone rules are not resolved by the current API. Preset offsets are illustrative and can be wrong for dates when DST applies.

## Panchang limits

The current daily endpoint evaluates Sun and Moon at local noon for tithi, nakshatra and a yoga index. Sunrise, sunset, karana boundaries and observance rules are not included. Do not use this endpoint for muhurta or ritual timing.

## Compatibility limits

The current match preview computes Tara and Bhakoot components only. It does not calculate all eight kootas, Nadi dosha cancellation, gender-based direction rules, or a complete recommendation. Its partial score is not an Ashtakoota total.

These limitations are surfaced in the API and interface. Verify computations against appropriate ephemeris references and qualified practitioners before relying on them.
