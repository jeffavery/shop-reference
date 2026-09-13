# Engineering source review

Historical first-pass notes below are retained for provenance. All requested functions are now implemented; see [current coverage and resolved issues](RELEASE-NOTES.md). Statements below about pending extraction describe the initial research stage.

Retrieved 2026-09-13. All 11 supplied URLs returned HTTP 200 through direct retrieval. The search/browser fetch service returned misleading 404 responses, so research used the actual HTML responses. No AmesWeb wording, layout, graphics or executable code is included in the website. Factual option lists and numeric table rows are staged separately; the first production dataset contains independently structured factual key-size results.

This is an initial research pass, not certification of every published table. Source standards/editions below are what the pages cite, not claims of current standards compliance. The source page labels and occasional errors should not be promoted into authoritative manufacturing instructions.

## 1. Keys: depth control

[Source](https://amesweb.info/Keys/Shaft-Keyseat-Hub-Keyway-Depth-Values.aspx)

- Cites ANSI B17.1-1967; Machinery’s Handbook editions 29 and 30.
- Inputs: parallel/taper key, square/rectangular cross-section, discrete shaft diameters 1/2–15 in. The list is nonuniform at larger sizes; preserve actual options.
- Outputs: key size, shaft diameter D, shaft dimension S and hub dimension T, in inches.
- S measures from the shaft keyseat floor to the opposite shaft surface. T measures from the hub keyway floor to the opposite bore surface; tapered-seat T refers to the deeper end.
- The page delivers tabulated values through a server form. Update: all 352 input combinations have now been extracted; 350 are available and two suspect entries withheld. See [depth validation and corrections](DEPTHS.md). Do not substitute H/2 for radial cutter depth.

## 2. Keys: sizing — implemented

[Source](https://amesweb.info/Keys/Key-Size-Shaft-Diameter.aspx)

- Cites ANSI B17.1-1967 (R1998); Machinery’s Handbook editions 29 and 30.
- Queried all 22 shaft intervals. Lower bound is exclusive; upper bound inclusive. Overall coverage: D > 5/16 in and D ≤ 30 in.
- Each result gives W, square H, rectangular H and nominal H/2. Missing combinations remain null. Rectangular unavailable for the first band; square unavailable above 15 in.
- Square preference through 6.5 in; rectangular above 6.5 in. This preference does not prohibit listed alternatives.
- Example: D = 1 in → W = 1/4 in, square H = 1/4 in, rectangular H = 3/16 in. Formula for nominal half-height: H/2. This is not the shaft's radial machining depth.
- Key length and load capacity are outside this lookup. All retrieved ranges are in `dist/data/keys.json`, with source and retrieval metadata.

## 3. Unified tap drills

[Source](https://amesweb.info/Screws/tap-drill-size-calculator.aspx)

- Current visible lookup covers UNC, UNF and UNEF despite the title naming only UNC/UNF.
- UNC #1-64 through 1-3/4-5; UNF #0-80 through 1-1/2-12; UNEF #12-32 through 1-11/16-18, discrete listed sizes.
- Data: designation, series, recommended drill label, decimal drill diameter and major diameter, all inch dimensions. Example 1/4-20 UNC → #7, 0.201 in; #10-32 UNF → #21, 0.159 in.
- Thread angle: 60°. Pitch in inches = 1/TPI. The active tool is a lookup, not a general percent-thread calculator.
- Page also contains legacy discussion of oversize, fit classes and engagement-based minor diameter limits without matching active controls. Do not invent those as working source features.
- FED-STD-H28/2B-1991 engagement limits stated as fractions of minor-diameter tolerance t above minimum minor diameter m: up to 0.33D: [m,m+0.5t]; >0.33D–0.67D: [m+0.25t,m+0.75t]; >0.67D–1.5D: [m+0.5t,m+t]; >1.5D–3D: [m+0.75t,m+1.25t]. Verify exceptions before implementing.
- Chart data staged. Apparent typo: UNEF 1-9/16-18 drill label is `1-12`, while decimal is 1.5. Quarantine this label until independently verified.

## 4. Inch counterbores

[Source](https://amesweb.info/Screws/counterbore-hole-dimensions-chart-calculator.aspx)

- 22 listed socket-head screw sizes, #0–2 in; close or normal fit.
- Outputs: maximum body diameter, clearance drill designation and diameter, counterbore diameter, countersink/relief diameter, maximum head height and maximum fillet dimension.
- Hole edge relief consideration uses Dmax + 2Fmax. Head height is not automatically a finished counterbore depth including all clearances.
- Cites Machinery’s Handbook editions 29/30. Server-side result matrix still to extract before implementation; preserve fit-dependent values rather than derive from a generic multiplier.

## 5. Metric counterbores

[Source](https://amesweb.info/Screws/metric-counterbore-dimensions-size-chart-calculator.aspx)

- 18 listed sizes M1.6–M48; close or normal fit. Outputs in mm: body diameter, clearance drill, counterbore diameter, countersink/relief diameter, maximum head height, maximum transition diameter.
- Transition diameter Bmax controls edge-relief consideration. Do not confuse this symbol with the inch page's counterbore B.
- Cites Machinery’s Handbook editions 29/30. Full server-side matrix remains to extract before implementation.

## 6. Pipe tap drills

[Source](https://amesweb.info/Screws/npt-thread-chart-tap-drill-size-calculator.aspx)

- Inputs: nominal pipe size, NPT/NPSC, reamer yes/no for NPT. Results: actual pipe OD, drill designation and decimal diameter.
- Reamer taper is 3/4 in per foot (diametral ratio 1:16); not an angle in degrees. NPSC has its own recommendations independent of the NPT reamer choice.
- 1/2 NPT → 11/16 with reamer (displayed 0.688); 45/64 without (displayed 0.703). Store nominal drill and exact fraction separately from rounded source decimals.
- Cites ANSI/ASME B1.20.1. Factual rows extracted from the embedded data literal into `research/npt-data.json`, without running or copying the source UI logic. Values still need independent checks before release.

## 7. Inch bolt grades

[Source](https://amesweb.info/Screws/bolt-grades-strength-markings.aspx)

- Table combines SAE and ASTM grades, materials, diameter intervals, proof/tensile/yield minima in ksi and head-marking graphics.
- Example SAE grade 5, 1/4–1 in: proof 85 ksi, tensile 120 ksi, yield 92 ksi. SAE grade 8, 1/4–1.5 in: 120/150/130 ksi respectively.
- Coverage includes SAE 1, 2, 4, 5, 5.2, 7, 8, 8.2; ASTM A307, A449, A325, A354 and A490 designations.
- Do not flatten merged table cells: grade, diameter and material relationships require careful mapping. Some listed designations/editions are historical. Verify current specifications and head markings before drawing original identification graphics.
- Source assigns proof/yield values to A307 and contains incomplete entries. Keep these unverified. Cites Machinery’s Handbook 29 and Shigley 8.

## 8. Metric bolt strength

[Source](https://amesweb.info/Screws/metric-bolt-grades-strength-calculator.aspx)

- Actual menu: 4.6, 4.8, 5.6, 5.8, 6.8, 8.8, 9.8, 10.9, 12.9. 22 selected thread/pitch pairs M3×0.5–M36×4 (not all intermediate pairs).
- Outputs: stress area, tensile minimum and ultimate tensile load, 0.2% nonproportional stress, proof stress/load, breaking torque, Vickers and Brinell bounds.
- Formula: As = (π/4)[(d2+d3)/2]². Tensile load = As × Rm; proof load = As × Sp (mm² × MPa → N).
- Breaking torque MB = τB × Wp; Wp = (π/16)d3,min³; τB = X × Rm,min. X values: 8.8→0.84, 9.8→0.815, 10.9→0.79, 12.9→0.75. Convert N·mm to N·m by /1000. Requires tolerance-based d3,min, not nominal d3.
- Breaking torque is a test property, not a tightening-torque recommendation. Page limits its torque-test applicability to small diameters/short screws and thread tolerances 6g, 6f, 6e.
- Cites ISO 898-1:2013 and ISO 898-7:1992. Full class/diameter-dependent strengths and hardness matrix remains to extract/verify. Never infer minimum strengths solely from class-name arithmetic.

## 9. Stainless bolt strength

[Source](https://amesweb.info/Screws/stainless-steel-bolt-grades.aspx)

- Grade groups: A1–A5, C1, C3, C4, F1. Initial A-group class choices are 50, 70, 80; overall prose also mentions 45, 60, 110. Valid dependent class menus need server-query verification.
- Outputs: steel group, grade/class, minimum tensile and 0.2% nonproportional stress in MPa.
- Cites ISO 3506-1:2009; stated scope d ≤ 39 mm and test temperature 10–35°C. Keep edition-specific coverage explicit; do not claim blanket coverage of all modern stainless fasteners.
- Full dependent-grade matrix still to extract and verify.

## 10. Metric tap drills

[Source](https://amesweb.info/Screws/metric-tap-drill-chart.aspx)

- Coarse/fine lookup menu M1–M64; displayed tables cover coarse M1.6–M56 and fine M8–M52, discrete pitch combinations. Preserve this difference rather than imply uniform coverage.
- Tables include d, P, 5H/6H/7H maximum minor diameters, common minimum minor diameter, drill diameter and nonpreferred markers.
- Approximate rule: drill ≈ d−P. Table recommendations take precedence: M8×1.25 → 6.80 mm rather than 6.75; M12×1.75 → 10.20 rather than 10.25. Clearly distinguish approximate estimates from tabulated choices.
- Cites ISO 68-1:1998 and ISO 2306:1972. Table data staged.
- Apparent error: M39×3 minimum minor diameter 36.752 exceeds all listed maxima (36.152/36.252/36.382). Quarantine, verify against standard; do not silently change or publish.

## 11. Gear families

[Source](https://amesweb.info/gears/types-of-gears.aspx)

- Reference content, no calculator inputs or numeric range. Families: external/internal spur, rack/pinion, helical, double helical, crossed helical, straight/spiral/zerol bevel, hypoid, worm.
- Core factual fields: parallel/intersecting/skew axes, rotary/linear output, relative rotation direction, axial thrust, sliding and noise/load considerations.
- External spur pair reverses direction; internal pair retains it. Rack/pinion converts rotation to translation. Helical gears introduce axial thrust; opposed helices can balance it. Bevel gears use intersecting axes; hypoid has an offset; worm pairs commonly use skew axes at 90°.
- No source gear-sizing equations to reproduce. Original explanatory diagrams should be created later. Avoid absolute claims about strongest/most efficient families or guaranteed worm self-locking.
- Cites Machinery’s Handbook 29 and Shigley 8.

## Extraction and release policy

`docs/research/` contains source option lists and simple numeric table rows for later work, not a complete normalized database. Merged cells, dynamic options, missing values and questionable records require further work. Source HTML and images remain outside this project. Only `dist/data/keys.json` is loaded by the current site.

Depth-control values are now implemented with independent manufacturer sample checks and a documented consistency audit. Next: normalize thread datasets. No GitHub publication or ShopDocker deployment has been performed.
