# Local review edition — September 13, 2026

All 11 requested source functions now have local interfaces across five sections. No external services, dependencies, fonts, imagery, trackers or online data calls are required at runtime. Source hyperlinks are optional reading links.

## Coverage

| Section | Local functions | Dataset |
|---|---|---|
| Keys & Keyways | Key sizes; shaft/hub depths | 22 size bands; 352 depth combinations, 350 enabled |
| Threads & Tap Drills | Unified; metric; pipe | 73 Unified entries; 53 metric pairs; 11 pipe sizes |
| Counterbores | Inch; metric | 44 inch and 36 metric size/fit combinations |
| Bolt/Material Strength | Inch grades; metric classes; stainless | 25 inch grade/range entries; 198 metric combinations; 11 stainless combinations |
| Gears | Gear-family reference | 11 families with original gear illustrations and recognition captions |

Every calculator responds to input changes without a Calculate button. Reference charts can be filtered. Stainless class choices depend on steel grade. NPSC hides and ignores the NPT reamer control. Data files are separate from view and lookup code.

## Source corrections and withheld values

- Key depth corrections and the two withheld rectangular 4-15/16-inch cases are documented in `DEPTHS.md`.
- Unified 1-9/16-18 UNEF had drill label `1-12` beside decimal 1.5. Label is normalized to 1-1/2; the value is unchanged.
- Metric M39×3 source minimum minor diameter exceeds its maximum limits. That one minimum is withheld; other tabulated values remain available.
- The source metric calculator contains NaN drill values for M64×6, M56×4 and M64×4. These display “Not tabulated.” The separately labelled d−P estimate remains available; it is never relabelled as a recommendation.
- Metric class 9.8 above M16 is outside scope and produces “Outside scope,” not numerical results. Verified with [Bossard's property table](https://media.bossard.com/ro-en/-/media/bossard-group/website/documents/technical-resources/en/f-004-en.pdf).
- A307 proof/yield values from AmesWeb are withheld. [Bolt Depot](https://boltdepot.com/fastener-information/Materials-and-Grades/Bolt-Grade-Chart) lists those properties as unspecified. Its Grade A identification is shown as 307A.
- A354 BC material is identified as heat-treated alloy steel, following [Portland Bolt](https://www.portlandbolt.com/technical/strength-requirements-by-grade/), rather than the source's weathering-steel description.
- SAE Grade 5 larger diameter band is included from the Bolt Depot cross-check. Historical A325/A490 values are explicitly labelled as historical; the site does not claim they are current F3125 procurement requirements.
- Missing strengths, test torques and tolerance limits stay null and display a dash. No fabricated zero values or interpolated rows.

## Validation

Fourteen automated tests pass, covering key boundaries/fractions, depth checks, tabulated examples, pipe options, counterbore geometry/fit ordering, metric stress areas and loads, valid scope, chart filtering and numbered versus whole-inch drill labels. All JavaScript modules pass syntax checks. Static assets and JSON are served locally.

This is dataset and code validation, not certification against every complete standard or a review of a particular joint design. Browser interaction and visual review of the newly added sections is reserved for the user's next review step. No GitHub push, ShopDocker changes, or public deployment was performed.

## Review route list

- `#keys` — key sizes
- `#depths` — S/T depths
- `#threads` — Unified drills
- `#metric-taps` — metric drills
- `#pipe-taps` — NPT/NPSC drills
- `#counterbores` — inch counterbores
- `#metric-counterbores` — metric counterbores
- `#strength` — inch bolt grades
- `#metric-strength` — metric bolt properties
- `#stainless-strength` — stainless properties
- `#gears` — gear families
