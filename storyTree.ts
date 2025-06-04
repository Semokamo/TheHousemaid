import { StoryTree } from './types';

// Story Tree for "The Housemaid - Chapter 1"
// Renamed from redHoodAdventureTree to housemaidStoryData
export const housemaidStoryData: StoryTree = {
  // --- SHARED SET-UP ---
  "T0_HR_EMAIL": {
    id: "T0_HR_EMAIL",
    timelineTitle: "T0: Urgent Email",
    scenePromptForGemini: "At 11:43 p.m., Millie Calloway’s battered phone buzzed again, its light carving a pale rectangle across the peeling wallpaper of her micro-studio. <br><br>**Subject:** *URGENT — Employment Offer* <br>**From:** HR Department, Winchester Holdings <br><br>*Dear Ms Calloway,* <br><br>We were impressed by your interview earlier this week. A live-in housekeeper position has opened unexpectedly, and we require your presence at the Winchester estate by **06:00 a.m. tomorrow**. Transportation will be arranged. Reply **ACCEPT** within thirty minutes to confirm. <br><br>Best regards, <br>*HR Staffing* <br><br>Rain fretted against the fire-escape outside as Millie reread the message—salary triple her last job, private room and board included, *urgent*, and no other details. Why the midnight vacancy? Who quits at this hour? Or worse—who gets fired? <br><br>Her thumb hovered over *A C C E P T*. In the hallway, someone argued about rent; a cockroach skittered beneath the hotplate. Millie exhaled, tasted rust in the air, and tapped send.",
    imagePromptSeed: "Close up on computer screen, urgent email, mansion silhouette, blurry worried woman's face reflection",
    choices: [
      { text: "Continue...", nextSceneId: "T1_RAIN_STARTS" }
    ]
  },
  "T1_RAIN_STARTS": {
    id: "T1_RAIN_STARTS",
    timelineTitle: "T1: Rain Begins",
    scenePromptForGemini: "The first raindrops find me at 5:21 a.m., needling through the halo of a flickering street-lamp as I drag my cheap canvas duffle toward the curb. Brooklyn smells like wet metal and yesterday’s garbage, but there’s a hush that makes every splash feel personal—like the city is whispering *turn back while you can*. <br><br>A weather alert blinks across my cracked phone screen: **SEVERE THUNDERSTORM WARNING — cresting by nightfall**. Perfect. Of course the universe would schedule a tempest the day I agree to entomb myself in a stranger’s mansion. <br><br>I huddle under the bodega’s crooked awning, counting the seconds between the flash of distant lightning and the faint roll of thunder. Six… seven… eight. The front is still miles off, but the drizzle is thickening, stitching the dawn air into a gray veil. <br><br>The email’s promise keeps looping in my skull—*triple salary, private room, immediate start*. I picture my landlord’s overdue notice wedged beneath my apartment door and tighten my grip on the bag. <br><br>Headlights slice through the watery gloom. A long, black town car noses to the curb, wipers beating a nervous cadence. The driver’s window glides down just enough for a voice—low, musical, faintly accented—to ask, “Ms Calloway?” <br><br>I swallow the taste of rust, nod, and step into the rain. As the door thunks shut behind me, the storm seems to close as well, sealing whatever pact I’ve just made with the house on the hill.",
    imagePromptSeed: "Rain streaks on window, dark clouds gathering, cityscape from car window, moody atmosphere",
    choices: [
      { text: "Continue...", nextSceneId: "T2_CHAUFFEUR_ENZO" }
    ]
  },
  "T2_CHAUFFEUR_ENZO": {
    id: "T2_CHAUFFEUR_ENZO",
    timelineTitle: "T2: Enzo's Warning",
    scenePromptForGemini: "The backseat smells of saddle soap and something more expensive—bergamot, maybe—and the doors close with the muffled hush of money. The driver adjusts the mirror; amber dashboard light outlines cheekbones sharp enough to cut paper. <br><br>“Enzo,” he says, voice warm but professionally distant. “I’ll have you at the estate in just under two hours, weather permitting.” <br><br>His accent is hard to place—somewhere south of Rome, maybe, polished by years in New York. Rain strafes the windows in diagonal streaks, the city blurring into graphite smears as we merge onto the BQE. <br><br>I clear my throat. “Do you… drive for the Winchesters often?” <br><br>“Nearly ten years.” He taps the turn signal, eyes flicking to the mirror again. “Long enough to learn the route blind. Long enough to know every pothole the city refuses to fix.” <br><br>Silence stretches, thick as upholstery foam. Then he adds, almost absent-minded: “And long enough to see that most girls don’t stay.” <br><br>I stare at the back of his headrest. “Girls?” <br><br>“Housemaids.” The single word seems to fog the interior more than our breath on the glass. “They arrive with bright eyes, leave with heavy hearts. Sometimes in the middle of the night.” <br><br>He offers nothing further, and I can feel the question burning my tongue, but I press it against the roof of my mouth. Outside, the East River flashes silver beneath a coil of lightning. <br><br>Enzo’s hands rest at ten and two, knuckles pale. “First piece of advice, Ms Calloway: the house listens. Walls are old. Speak kindly to them.” <br><br>I almost laugh, but the sound sticks. The windshield wipers thud, a metronome counting down to whatever waits beyond the bridge.",
    imagePromptSeed: "Interior of luxury car, chauffeur's eyes in rearview mirror, Millie looking apprehensive, rainy road",
    choices: [
      { text: "Continue...", nextSceneId: "T3_ARRIVAL_FOYER" }
    ]
  },
  "T3_ARRIVAL_FOYER": {
    id: "T3_ARRIVAL_FOYER",
    timelineTitle: "T3: Mansion Arrival",
    scenePromptForGemini: "Storm-clouds are still chasing us when the wrought-iron gates rasp open and the town car prowls up a drive as long as a runway. The mansion rises out of the trees in stages—first the slate roof, then a crown of chimneys, and finally twin marble griffins glowering over a door fit for a cathedral. <br><br>Enzo kills the engine. For a breath the only sound is rain sizzling on the hood. He offers no parting wisdom, only meets my eyes in the mirror the way a priest might study a soul: already memorising what will haunt him later. <br><br>The front door swings wide before I can knock. A butler I’ll learn is called **Douglas** steps aside wordlessly, and the foyer swallows me whole. My boots click once—like a pistol cocking—then the space absorbs every echo into its fifty-foot vault. <br><br>An obscene chandelier—tiers of crystal shaped like dripping icicles—hangs over a mosaic floor depicting constellations I can’t name. Somewhere, a grandfather clock beats out the last seconds of five-thirty a.m. <br><br>But it’s the scent that pins me in place: lilacs, unmistakable and wrong for winter. The fragrance drifts from vents high in the wainscoting, as if the house itself has sweat glands. I inhale too sharply and cough; the sweetness feels almost medicinal, a mask for something sour beneath. <br><br>The door thunders shut behind me. Outside, thunder answers. Inside, silence blooms, vast enough that when a single droplet falls from my coat hem, I hear it splash against the marble like a warning bell. <br><br>I set my duffle down and crane my neck. Balconied landings spiral upward; hallways radiate like spokes. Every surface—banister, panel, gilded frame—gleams as though polished nightly by ghosts. <br><br>Somewhere deeper in the mansion a woman’s laugh flares, brittle as glass, then cuts off mid-note. Footsteps approach, quick and uneven. I square my shoulders, unaware I’m holding my breath, and wait for the lady of the house to appear.",
    imagePromptSeed: "Grand mansion foyer, ornate chandelier, Millie dwarfed by entrance, shadows, faint floral hint",
    choices: [
      { text: "Continue...", nextSceneId: "T4_MEET_NINA" }
    ]
  },
  "T4_MEET_NINA": {
    id: "T4_MEET_NINA",
    timelineTitle: "T4: Meeting Nina",
    scenePromptForGemini: "She materialises at the top of the sweeping staircase, one pale hand skating along the banister as though the carved mahogany might buck her off at any second. <br><br>In the portraits flanking the stairs, stiff-collared Winchesters glare down in oils and gilt, but Nina Winchester is all living motion—shoulders tilting, fingertips fluttering at the neckline of a silk blouse the colour of late peaches. A strand of blonde hair has wriggled free of an impeccable chignon; she tucks it back three times in the space of fifteen steps. <br><br>The closer she comes, the more contradictions sharpen into view. The jewellery: discreet platinum studs, but a wedding band heavy enough to serve as a paperweight. The smile: gracious, but perched on the brink of apology. And the eyes—green, fever-bright, scanning me the way a locksmith studies tumblers, searching for the catch that will make everything click or everything jam. <br><br>“You must be Millie.” Her voice carries the melody of an expensive education and the tremor of too much coffee. She extends a hand that’s warm and damp, as though she’s just slipped free of a glove no one else can see. <br><br>“Mrs Winchester, thank you for—” <br><br>“Oh, Nina, please.” She laughs—one brittle chiming note that startles itself into silence. Her gaze flicks toward the chandelier overhead, as if checking whether it’s listening. “Formality feels so heavy before breakfast, don’t you think?” <br><br>She steps back to survey me, head canted like a curator assessing an exhibit that might not pass conservation tests. Then, with sudden decisiveness, she hooks her arm through mine. The gesture is intimate yet oddly desperate, as if I’m a lifeline she’s only just remembered. <br><br>“Come,” she whispers. “The house is enormous and Andrew insists on punctuality. We’ll sign the paperwork in the solarium—much nicer light.” <br><br>Her perfume is lilac layered over something acrid—chlorine, perhaps. When she guides me toward a corridor veiled in shadow, I feel the faintest vibration in her elbow against mine: a hum that might be nerves… or fear.",
    imagePromptSeed: "Elegant woman Nina Winchester, slightly nervous expression, opulent room background, Millie observing",
    choices: [
      { text: "Continue...", nextSceneId: "T5_NINAS_PHONE_CALL" }
    ]
  },
  "T5_NINAS_PHONE_CALL": {
    id: "T5_NINAS_PHONE_CALL",
    timelineTitle: "T5: Andrew's Call",
    scenePromptForGemini: "We make it barely ten paces before a brittle trill cuts the hush, the sound too shrill to belong inside these velvet halls. Nina flinches, fishes a rose-gold phone from the pocket of her tailored trousers, and lifts the screen just far enough for me to glimpse the caller-ID banner: **ANDREW WINCHESTER – PRIVATE**. <br><br>For a heartbeat she is motionless, the way prey animals freeze when they sense thermal sights on their hides. Then the mask slides back into place. <br><br>She swipes *answer* but keeps the device tucked tight to her sternum, voice pitched low enough that marble can’t carry it. “Yes, darling. I’m aware. Six o’clock on the dot. No—no, she just arrived.” <br><br>The reply is too faint for me to catch, but whatever Andrew says makes Nina’s pupils contract. Her jaw moves—grind, release—before she murmurs, “Under control,” and ends the call without waiting for goodbye. <br><br>The phone vibrates again instantly, a buzz like an angry wasp. Nina’s thumb hovers. On the second ring something in her fractures; she taps *silence* so hard I fear the glass will spider. The screen goes black, reflecting both of us: her smile fixed, my curiosity plain. <br><br>She exhales through her nose—polite, measured, lethal. “Board meetings,” she explains, sliding the phone away. “My husband lives for them. Sometimes he forgets other people have lungs too.” <br><br>She forces a brighter note into her voice and ushers me onward, but the corridor seems narrower now, the walls leaning in to listen. Behind us, the dormant phone gleams like an unblinking eye, waiting to reawaken.",
    imagePromptSeed: "Nina Winchester looking annoyed at phone, hand silencing it, Millie in background, tense atmosphere",
    choices: [
      { text: "Continue...", nextSceneId: "D1_NINA_FETCHES_CONTRACTS" }
    ]
  },

  // --- D1 – Millie is left alone for five minutes while Nina fetches “contracts.” ---
  "D1_NINA_FETCHES_CONTRACTS": {
    id: "D1_NINA_FETCHES_CONTRACTS",
    timelineTitle: "D1: Alone in the Foyer",
    scenePromptForGemini: "Nina ghosts through a side arch, heels ticking faster than the grandfather clock, promising to “fetch the paperwork” before Andrew surfaces. The hush that replaces her is so complete my own pulse sounds indecent. <br><br>I’m alone—truly alone—for the first time since the gates. Five minutes, she said, but the mansion seems to breathe in seconds: damp exhale from the vents, tremor in the chandelier crystals, tiny echo of settling beams overhead. <br><br>Three temptations tug at me. <br><br>**Up the service stair:** a narrow flight half-hidden behind a tapestry. At the top, a warped attic door wears a jagged scratch near the brass knob, as though something on the other side tried to claw its way out. Dust motes drift in the stairwell like suspended question marks. <br><br>**Through the arch to my right:** the kitchen glimmers—rows of copper pans, a commercial-grade stove still warm. In the sink, a single chef’s knife rests unlathered, blade reflecting the flicker of storm-light. Whoever abandoned it did so in haste. <br><br>**Or simply stand my ground:** portraits ring the foyer, gilt frames big as caskets. One painting—an 1890s matriarch in mourning lace—holds my gaze. Each time I look away, I swear the woman’s black-button eyes slide after me, tracking, waiting. <br><br>Nina’s footsteps fade somewhere deep in the mansion. I have maybe three hundred seconds before duty—or danger—comes back through that archway. Where does my curiosity land?",
    imagePromptSeed: "Millie standing alone in grand foyer, looking around thoughtfully, sense of isolation, choices looming",
    choices: [
      { text: "Peek at the locked attic door up the service stairs.", nextSceneId: "D1_A_PEEK_ATTIC_DOOR_RESULT" },
      { text: "Wander to the kitchen to inspect potential working space.", nextSceneId: "D1_B_KITCHEN_INSPECT_RESULT" },
      { text: "Stay exactly where told, studying foyer art.", nextSceneId: "D1_C_STUDY_FOYER_ART_RESULT" }
    ]
  },

  // D1 Branches Results
  "D1_A_PEEK_ATTIC_DOOR_RESULT": {
    id: "D1_A_PEEK_ATTIC_DOOR_RESULT",
    timelineTitle: "D1→A: Attic Door Scratch",
    scenePromptForGemini: "I slip behind the tapestry and tiptoe up the service stair, each riser whining like it resents the weight. Dust lies undisturbed, but the air feels stirred—as though someone passed only moments before. <br><br>The attic door squats at the top, boards warped, paint bubbled by age. In the gloom my phone light picks out a single wound: a gouge three fingers long carved into the wood beside the knob. Fresh splinters curl outward, blond against the dark grain, and something greasier than sap rims the cut. <br><br>I reach to touch—habit of a cleaner assessing damage—then freeze. The wood around the scratch is warm, almost pulsing. From beyond the door comes a hush so complete it registers as sound: the silent intake of a creature deciding whether to strike. <br><br>A floorboard pops somewhere downstairs. Instinct slams me backward; I kill the light, heart ricocheting off my ribs. In the brief darkness the scratch seems to glow, a pale mouth shaped for a scream that never made it out. <br><br>I back down the stair, breath caught in my throat, and tug the tapestry straight just as Nina’s brisk footsteps re-enter the foyer below.",
    imagePromptSeed: "Close up on old wooden door, deep scratch mark near knob, service stairs, dusty, ominous",
    choices: [
      { text: "Continue...", nextSceneId: "T6_THUNDERCLAP_PATH_D1A" }
    ]
  },
  "D1_B_KITCHEN_INSPECT_RESULT": {
    id: "D1_B_KITCHEN_INSPECT_RESULT",
    timelineTitle: "D1→B: Unwashed Knife",
    scenePromptForGemini: "Curiosity steers me through the arch toward the kitchens. The tiled corridor cools by ten degrees, as if I’ve stepped into a different climate. Stainless-steel prep tables march in regimented rows, every surface buffed to a mirror—except for the farmhouse sink at the far end. <br><br>A single chef’s knife lies abandoned in the basin, its blade streaked with something darker than water. A thin trickle still meanders toward the drain, staining the suds a faint rust-rose. I nudge the faucet, but the handle jerks—someone shut the main valve. <br><br>The industrial fridge thrums like a distant generator. Above it, a pot rack sways almost imperceptibly, spoons and ladles chiming the tail-end of a vibration. Either a truck rumbled past outside—or someone left this room seconds before I entered. <br><br>I reach for the knife, thumb ready to test the edge, then spot a detail that stills my hand: the heel of the blade bears a shallow notch, as though it once struck bone or marble and lost the argument. Tiny metal filings cling to the nick like iron filings to a magnet. <br><br>Rain lashes the casement window; thunder answers from somewhere closer than before. I set the knife on a drying rack, hilt pointing neatly west—as though tidiness could erase questions—and turn back toward the foyer just in time to hear Nina’s heels clicking their return.",
    imagePromptSeed: "Large kitchen sink, single unwashed chef's knife, water droplet, gleaming steel, unsettling discovery",
    choices: [
      { text: "Continue...", nextSceneId: "T6_THUNDERCLAP_PATH_D1B" }
    ]
  },
  "D1_C_STUDY_FOYER_ART_RESULT": {
    id: "D1_C_STUDY_FOYER_ART_RESULT",
    timelineTitle: "D1→C: Tracking Eyes",
    scenePromptForGemini: "I decide to obey orders and stay put—yet standing still in this cavernous foyer feels like volunteering for dissection. To occupy my hands I smooth the damp hem of my coat and let my gaze climb the walls. <br><br>The portraits are arranged salon-style, frames crowding frames, a century of Winchesters stacked like geological layers. Naval heroes in brass buttons glower over debutantes painted in gauzy pastels, their captured ringlets forever immune to frizz. <br><br>One canvas stops me cold: a young woman in Edwardian mourning black, face turned just off-center, as though the artist caught her mid-secret. The whites of her eyes have yellowed with varnish, giving the pupils a raw, animal brightness. <br><br>I step to the left. Her gaze pivots. <br><br>I step to the right. Same. <br><br>It’s an old parlour trick—artists skew perspective so the sitter seems alive—but the effect is too precise. The pupils aren’t merely following; they’re **searching**, as if trying different focal depths to be certain I’m truly there. <br><br>Another flash of lightning strobes through the stained-glass transom, and for half a heartbeat the painted eyelids appear to **blink**—a minuscule crack in the varnish flexing like flesh. When the foyer dims again, a new detail registers: a faint diagonal scrape across the portrait’s lower frame, fresh wood showing through gilding. Something—or someone—recently tried to pry this picture free. <br><br>A chill—not from the drafty vestibule but the living sensation of being catalogued—skitters up my spine. I retreat to the precise square of marble where Nina left me, only to realise my boots now stand half a metre off-centre. <br><br>Footsteps echo beyond the archway. I tug my coat straight and paste on a neutral expression while the chandelier crystals tremble, as if the house itself is laughing at the game I just lost.",
    imagePromptSeed: "Ornate foyer portrait, close up on eyes, illusion of movement, Millie feeling watched, eerie",
    choices: [
      { text: "Continue...", nextSceneId: "T6_THUNDERCLAP_PATH_D1C" }
    ]
  },

  // --- SHARED BEAT AFTER D1 (Paths for D1A, D1B, D1C context) ---
  // Path after D1A
  "T6_THUNDERCLAP_PATH_D1A": {
    id: "T6_THUNDERCLAP_PATH_D1A",
    timelineTitle: "T6: Thunder (Path D1A)",
    scenePromptForGemini: "The mansion seems to hunch its shoulders first—curtains puff inward, chandelier prisms jitter—then the heavens fire their opening salvo. A thunderclap detonates directly overhead, hard enough to make the caryatid columns shiver and my molars buzz. <br><br>The bulbs blink twice in fast succession, freezing the foyer in epileptic snapshots: ceiling, blackness, ceiling again. In that stop-motion glare the marble looks centuries older, veined with something almost vascular, and the painted Winchesters appear caught mid-wince. <br><br>When the light steadies, it has lost confidence; each filament glows a half-step duller, like a singer who’s forgotten the key. Deep inside the walls a relay trips, followed by a fragile whine as emergency circuits beg for mercy. The air tastes of copper, ozone, and dust shaken loose from rafters no broom has met in decades. <br><br>Outside, rain escalates from hurried taps to balled fists. Within, a hush settles so deliberate it feels engineered—an acoustical quarantine while the house decides how, or if, it wishes to answer the sky’s challenge. I stand motionless, letting the storm speak first.",
    imagePromptSeed: "Interior lights flickering, dark room, distant lightning flash through window, tense moment",
    choices: [
      { text: "Continue...", nextSceneId: "T7_ANDREW_ARRIVES_PATH_D1A" }
    ]
  },
  "T7_ANDREW_ARRIVES_PATH_D1A": {
    id: "T7_ANDREW_ARRIVES_PATH_D1A",
    timelineTitle: "T7: Andrew Arrives (Path D1A)",
    scenePromptForGemini: "The front doors slam inward on a gust that scatters lilac petals from some unseen arrangement. Andrew Winchester strides over the threshold, rainwater sluicing from a trench-coat so dark it drinks the light. He’s taller than the portraits predicted, shoulders squared like they’ve never known apology. <br><br>He peels off the coat in one practiced sweep; droplets arc, spattering the zodiac mosaic. A single bead finds the gouged scratch on my thumb—the splinter I earned at the attic door—and stings like a secret exposed. <br><br>“Power flickered?” he asks the room at large, baritone soft but cut with flint. Douglas the butler murmurs an affirmative. Andrew’s gaze snaps to me, cataloguing height, hands, hesitation. An infinitesimal nod follows, approval measured in millimeters. <br><br>“You’re the new housemaid.” Not a question. The thunder chooses that moment to roll again, underscoring his verdict. <br><br>Behind him the wind stuffs rain into the foyer until Douglas wrestles the doors shut. In the sudden hush, the only sound is water weeping from Andrew’s coat into a slow, inevitable puddle that points directly toward the service stairs I just abandoned.",
    imagePromptSeed: "Man Andrew Winchester at doorway, wet coat, stern expression, imposing figure, rain background",
    choices: [
      { text: "Continue...", nextSceneId: "T8_TEA_INTERVIEW_PATH_D1A" }
    ]
  },
  "T8_TEA_INTERVIEW_PATH_D1A": {
    id: "T8_TEA_INTERVIEW_PATH_D1A",
    timelineTitle: "T8: Tea Interview (Path D1A)",
    scenePromptForGemini: "Nina steers us into the drawing-room while Douglas ghosts behind with a silver tray. The space is all muted brocades and lead-crystal starlight, yet the storm prowling the windows turns every surface war-shaded. <br><br>Andrew stands at the mantle, hands clasped behind his back, assessing me like a general reviewing the newest recruit. When Nina pours the chamomile, he shifts just enough to test the chair’s sturdiness before he allows me to sit—a gesture equal parts courtesy and assessment. <br><br>Steam coils from the delicate cup; the scent transports me to hospital corridors where volunteers hand out calm in paper sachets. Andrew’s approving nod from the foyer lingers in my mind, urging me to match whatever standard earned it. <br><br>Nina begins with soft questions—“Have you held a live-in post before?”—but Andrew’s occasional interjections chisel down to granite facts: *How quickly do you adapt?* *What woke you last night?* *Do you fear storms?* <br><br>I answer evenly, though the scratch on my thumb throbs each time I curl my fingers around porcelain. The moment the tea is three sips low, Nina’s smile reappears with surgical precision. “Very good,” she says, as though the interview were written in tealeaves and she’s just read the last swirl.",
    imagePromptSeed: "Drawing room, Nina serving tea, Millie seated, formal yet tense atmosphere, teacups",
    choices: [
      { text: "Continue...", nextSceneId: "D2_TEACUP_SHATTERS_PATH_D1A" }
    ]
  },

  // Path after D1B
  "T6_THUNDERCLAP_PATH_D1B": {
    id: "T6_THUNDERCLAP_PATH_D1B",
    timelineTitle: "T6: Thunder (Path D1B)",
    scenePromptForGemini: "Sound arrives like a piledriver dropped from orbit—one colossal boom that surges up through the marble and into my sternum. The foyer strobes twice: bright as arc-light, then ink-dark, then bright again. In those freeze-frames the chandelier swings a fraction off-plumb and the portraits seem to recoil, mouths braced for a second blow. <br><br>On the third flicker the lamps settle into a sulky amber, their voltage shaved thin. A dusty tang of burnt insulation ghosts through the air. Somewhere underfoot a circuit breaker chatters, quickly followed by the bronchial cough of the backup generator rousing in the sub-basement. <br><br>Lightning bleeds sideways across the stained-glass transom, painting the floor with momentary shards of cobalt and blood-red. Each diffraction of color feels like a wound reopening. <br><br>Then—nothing. A manufactured silence so pure my pulse sounds like contraband. Rain battering the windows is suddenly distant, as though the house has thrown up psychic earplugs. For a heartbeat I wonder whether I’m the trespasser or the prisoner, and I don’t dare move to find out.",
    imagePromptSeed: "Interior lights flickering, dark room, distant lightning flash through window, tense moment",
    choices: [
      { text: "Continue...", nextSceneId: "T7_ANDREW_ARRIVES_PATH_D1B" }
    ]
  },
  "T7_ANDREW_ARRIVES_PATH_D1B": {
    id: "T7_ANDREW_ARRIVES_PATH_D1B",
    timelineTitle: "T7: Andrew Arrives (Path D1B)",
    scenePromptForGemini: "A violent draft precedes him, flaring every candle-flame in the sconces sideways. Andrew Winchester enters like the storm’s emissary—hair slick to his skull, cufflinks flashing stray lightning. He drags a hand through wet strands, then wipes the water on a silk tie already ruined by the downpour. <br><br>The scent of rain and engine oil follows, displacing the kitchen’s lingering steel tang still ghosting my fingertips. His gaze sweeps the foyer, fixes on the lone damp print my boot left after I rinsed nothing but questions from that knife. <br><br>“Generator’s holding,” he mutters, half to himself. Only when satisfied does he grant me attention—eyes a pale, unblinking gray like sky before hail. A fractional tilt of his head suggests I speak first, but etiquette deserts me. <br><br>Nina flutters in from a side corridor, cheeks pink with urgency. Andrew’s shoulders soften by a single degree at her proximity, then retighten as thunder detonates overhead. <br><br>He shrugs off his coat; water splatters across marble, catching the chandelier’s glow like droplets of molten glass. “Let’s not keep the house waiting,” he says, and the command is aimed at all of us—including, somehow, the walls.",
    imagePromptSeed: "Man Andrew Winchester at doorway, wet coat, stern expression, imposing figure, rain background",
    choices: [
      { text: "Continue...", nextSceneId: "T8_TEA_INTERVIEW_PATH_D1B" }
    ]
  },
  "T8_TEA_INTERVIEW_PATH_D1B": {
    id: "T8_TEA_INTERVIEW_PATH_D1B",
    timelineTitle: "T8: Tea Interview (Path D1B)",
    scenePromptForGemini: "The drawing-room smells faintly of citrus wax and new upholstery, a safer scent than the metallic tang I still taste from the kitchen’s lone knife. Nina fusses over embroidered cushions, coaxing me into a Queen Anne chair whose legs look too spindly for a grown woman, yet refuse to creak. <br><br>Andrew remains leaning against the door-jamb, arms folded, cufflinks winking like small moons each time lightning glitches the sky. He says little, but the weight of his gaze edits every syllable I utter. <br><br>Chamomile steams in delicate china. Nina’s hands tremble just enough to chime saucer against cup before she sets it down. “Tell us about your calm under pressure,” she urges, voice silk-thin. <br><br>I think of the still-warm blade, of how methodically I’d planned to scrub it, and describe instead the catering job where a compressor failed mid-banquet and I salvaged dessert with a cooler full of dry ice. Andrew’s eyebrow ticks upward—interest, maybe approval. <br><br>The tea cools fast, skinning over. Outside, thunder pets the roof like a warning. Nina marks something on a vellum sheet—my résumé, or a private scorecard—and offers a smile that feels oddly grateful, as though my competence lets her breathe for the first time tonight.",
    imagePromptSeed: "Drawing room, Nina serving tea, Millie seated, formal yet tense atmosphere, teacups",
    choices: [
      { text: "Continue...", nextSceneId: "D2_TEACUP_SHATTERS_PATH_D1B" }
    ]
  },

  // Path after D1C
  "T6_THUNDERCLAP_PATH_D1C": {
    id: "T6_THUNDERCLAP_PATH_D1C",
    timelineTitle: "T6: Thunder (Path D1C)",
    scenePromptForGemini: "The crack comes not as a roar but a rending—like sheet metal torn by gods—followed an instant later by a pressure wave that bows the mullioned windows. Lightning forks across the coffered ceiling, splashing argent light that multiplies through the chandelier until the walls glitter with frantic Morse. <br><br>Total darkness pounces, alive with a million after-images. Before I can breathe, the bulbs gasp back to life at half-strength, each one a shaken candle. Dust motes wheel drunkenly in the disturbed air; I smell ozone, wet plaster, and the faint sweetness of forced lilac shoved aside by storm-breath. <br><br>Hidden conduits complain—a dull tick-tick-tick—then the low, continuous hum of ancillary power beds itself into the floor like a tuning fork against bone. It’s a sound I feel more than hear, a reminder that even mansions need pacemakers. <br><br>Outside, the rain redoubles, pelting the glass in frantic semaphore, yet indoors the pause that follows is cathedral-still, as if the building has inhaled and now waits to learn whether it should scream or sing. I do the only polite thing: I wait with it.",
    imagePromptSeed: "Interior lights flickering, dark room, distant lightning flash through window, tense moment",
    choices: [
      { text: "Continue...", nextSceneId: "T7_ANDREW_ARRIVES_PATH_D1C" }
    ]
  },
  "T7_ANDREW_ARRIVES_PATH_D1C": {
    id: "T7_ANDREW_ARRIVES_PATH_D1C",
    timelineTitle: "T7: Andrew Arrives (Path D1C)",
    scenePromptForGemini: "The double doors crack open just wide enough for Andrew Winchester to slip through, silhouette carved by backlit lightning. Rain has pasted his hair against his scalp in orderly rows; a droplet clings to the point of his nose until gravity loses patience. <br><br>He unbuttons a charcoal coat, each pop of horn echoing in the vaulted hush. The dimmed bulbs reveal a man assembled from right angles—jawline, collar, clenched fists—as precise as the gilded frames that line the walls. One portrait behind me—a woman whose eyes never quit—seems to lean forward for a better look. <br><br>Andrew drapes the coat over Douglas’s arm without breaking eye contact with me. “Miss Calloway, I presume,” he says, the consonants crisp enough to slice bread. I manage a nod. His scrutiny lingers a beat too long, as though deciding where I would best hang in his private gallery. <br><br>Thunder rolls again, rattling the chandelier; its prisms cast frantic constellations across his cheekbones. He appears amused by the tremor, smoothing a cuff that needs no smoothing. <br><br>“Let’s get you settled,” he decides, voice low as cellar stone. The doors behind him seal with a hydraulic sigh, cutting off the storm—and any notion I had of the outside world blinking me back to safety.",
    imagePromptSeed: "Man Andrew Winchester at doorway, wet coat, stern expression, imposing figure, rain background",
    choices: [
      { text: "Continue...", nextSceneId: "T8_TEA_INTERVIEW_PATH_D1C" }
    ]
  },
  "T8_TEA_INTERVIEW_PATH_D1C": {
    id: "T8_TEA_INTERVIEW_PATH_D1C",
    timelineTitle: "T8: Tea Interview (Path D1C)",
    scenePromptForGemini: "Oil portraits crowd the drawing-room walls, their varnished eyes glinting each time lightning backlights the drapes. I recognise the empty outline of one missing frame—the same ghost rectangle I studied in the foyer—and feel those absent eyes most of all. <br><br>Nina pours chamomile that smells of garden mornings, but her own hands quiver like new leaves in wind. Andrew settles opposite me, legs crossed with calculated ease, yet his posture suggests a sprung trap awaiting pressure. <br><br>Questions begin politely enough—housekeeping schedules, experience with silver polish—yet every so often Andrew detours into unexpected terrain: *Do you believe houses remember things?* *How light a sleeper are you?* Nina flinches at each digression, smoothing her skirt as though the fabric can iron out the intent. <br><br>I sip, answer, sip again, feeling hunted by both the living and the painted. One portrait’s glossy surface reflects miniature replicas of us, and in that warped mirror Andrew’s face seems stretched, predatory. <br><br>When the teacups clink back onto saucers, Nina releases a breath she might have been holding for years. “Excellent,” she murmurs, voice parchment-thin. Somewhere in the house a door bangs—distant, hollow, above us. All three of us pretend we didn’t hear it.",
    imagePromptSeed: "Drawing room, Nina serving tea, Millie seated, formal yet tense atmosphere, teacups",
    choices: [
      { text: "Continue...", nextSceneId: "D2_TEACUP_SHATTERS_PATH_D1C" }
    ]
  },

  // --- D2 – During tea, Nina’s teacup slips and shatters. (Nodes specific to D1 context) ---
  "D2_TEACUP_SHATTERS_PATH_D1A": {
    id: "D2_TEACUP_SHATTERS_PATH_D1A",
    timelineTitle: "D2: Teacup Shatters (Path D1A)",
    scenePromptForGemini: "The interview is winding toward something like relief when Nina’s fingers falter. A tremor—no bigger than a bird’s heartbeat—tips the rim of her cup against the saucer. Porcelain meets porcelain with a *clink* too sharp to belong in polite conversation. <br><br>Time stutters. I notice everything in micro-focus: the shimmer of chamomile meniscus; the way Andrew’s approving nod (earned earlier in the foyer) freezes mid-angle; the dull ache of the attic splinter still lodged beside my thumb. <br><br>The cup slips. Gravity snatches it, hurling white shards and amber tea across the carpet. Steam and lilac perfume billow in the same breath, and the crash reverberates like distant gunfire along the picture rails. <br><br>Instinct fires—but which one? Leap forward and shield Nina from flying shards? Snatch the linen napkin and blot the damage with military precision? Or lock my knees and wait for orders, risking Andrew’s fury? <br><br>I have less than a heartbeat to choose.",
    imagePromptSeed: "Shattered teacup on floor, tea splashing, shocked faces, porcelain shards, dramatic moment",
    choices: [
      { text: "Jump forward, shield Nina from shards.", nextSceneId: "D2_A1_SHIELD_NINA_RESULT_PATH_D1A" },
      { text: "Grab linen napkin, mop spill methodically.", nextSceneId: "D2_B1_MOP_SPILL_RESULT_PATH_D1A" },
      { text: "Freeze—wait for instructions.", nextSceneId: "D2_C1_FREEZE_WAIT_RESULT_PATH_D1A" }
    ]
  },
  "D2_TEACUP_SHATTERS_PATH_D1B": {
    id: "D2_TEACUP_SHATTERS_PATH_D1B",
    timelineTitle: "D2: Teacup Shatters (Path D1B)",
    scenePromptForGemini: "Nina’s teaspoon rings the bone-china rim in a nervous circle, the sound lingering like tinnitus. I’m still half-listening for the kitchen’s generator hum when her grip misfires. The handle skates through her damp fingers, and suddenly the cup is airborne, amber arc of tea glinting in the chandelier’s fractured light. <br><br>The vessel explodes against the rug, shards clattering like silverware dropped in a concrete sink. Scalding tea spatters my shoes, carrying the faint metallic tang that clung to the chef’s knife I found earlier. <br><br>Thunder chooses that instant to punch the roof; the chandelier flickers, throwing kaleidoscopes across Andrew’s taut expression. <br><br>Knee-jerk options crowd my brain: hurl myself between Nina and debris, dive for a napkin and triage the spill, or freeze—allowing the owners to dictate next steps while I measure their tempers. <br><br>Decision has to be instantaneous; consequences will last longer than china.",
    imagePromptSeed: "Shattered teacup on floor, tea splashing, shocked faces, porcelain shards, dramatic moment",
    choices: [
      { text: "Jump forward, shield Nina from shards.", nextSceneId: "D2_A1_SHIELD_NINA_RESULT_PATH_D1B" },
      { text: "Grab linen napkin, mop spill methodically.", nextSceneId: "D2_B1_MOP_SPILL_RESULT_PATH_D1B" },
      { text: "Freeze—wait for instructions.", nextSceneId: "D2_C1_FREEZE_WAIT_RESULT_PATH_D1B" }
    ]
  },
  "D2_TEACUP_SHATTERS_PATH_D1C": {
    id: "D2_TEACUP_SHATTERS_PATH_D1C",
    timelineTitle: "D2: Teacup Shatters (Path D1C)",
    scenePromptForGemini: "A hush has settled over the drawing-room, thick enough to hear the portraits breathing. I’m acutely aware of the empty frame on the wall behind me—its absence a pressure at my back—when Nina’s hand spasms. The teacup performs a slow pirouette, then loses altitude. <br><br>Porcelain detonates on the parquet, shards skidding beneath armchairs. Tea splashes up the legs of a nearby ottoman, staining brocade the color of fading bruise. <br><br>For a blink the chandelier’s prisms capture dozens of miniature disasters, each reflected fragment showing Andrew’s jaw tightening, Nina’s eyes wide, and me—caught between action and inertia. <br><br>Three instincts ricochet through my body: vault forward to shield Nina; seize the starched linen and blot the spreading stain; or stand immobile, letting the Winchesters reveal how they expect crises to be managed. <br><br>The portraits watch, waiting to see which role I choose to play.",
    imagePromptSeed: "Shattered teacup on floor, tea splashing, shocked faces, porcelain shards, dramatic moment",
    choices: [
      { text: "Jump forward, shield Nina from shards.", nextSceneId: "D2_A1_SHIELD_NINA_RESULT_PATH_D1C" },
      { text: "Grab linen napkin, mop spill methodically.", nextSceneId: "D2_B1_MOP_SPILL_RESULT_PATH_D1C" },
      { text: "Freeze—wait for instructions.", nextSceneId: "D2_C1_FREEZE_WAIT_RESULT_PATH_D1C" }
    ]
  },

  // D2 Branches Results (Paths for D1A, D1B, D1C context)
  "D2_A1_SHIELD_NINA_RESULT_PATH_D1A": {
     id: "D2_A1_SHIELD_NINA_RESULT_PATH_D1A", 
     timelineTitle: "D2→A1: Andrew Approves (Path D1A)", 
     scenePromptForGemini: "I move before thinking—legs uncoiling, chair clattering back. My forearm sweeps in front of Nina just as a splinter of porcelain ricochets off the hearth. The shard clocks my cuff, slicing through cotton and stinging skin, but Nina’s silk blouse stays immaculate. <br><br>For a breath all I hear is my own pulse—then Andrew’s low exhalation from the mantel. He inclines his head an almost imperceptible degree, the gesture a signature on an invisible contract. <br><br>“Good reflexes,” he murmurs. Approval weighs more coming from him than praise from anyone I’ve ever served. Nina’s hand lights on my elbow, fingers light but shaking. “Thank you,” she whispers, eyes glossy with shock—or something older than shock. <br><br>I straighten, ignoring the bloom of blood on my sleeve. The scattered shards glitter like tiny moons on the carpet, already cooling. Beyond the windows thunder rolls on, but inside the atmosphere has shifted: Nina’s gratitude hovers like perfume, and Andrew’s gaze has gone from appraising to almost proprietary.", 
     imagePromptSeed: "Andrew Winchester nodding approvingly, Millie shielding Nina, subtle gesture", 
     choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1A" }
     ]
    },
  "D2_B1_MOP_SPILL_RESULT_PATH_D1A": { 
    id: "D2_B1_MOP_SPILL_RESULT_PATH_D1A", 
    timelineTitle: "D2→B1: Nina Praises (Path D1A)", 
    scenePromptForGemini: "My chair hasn’t finished scraping back before I’ve seized a damask napkin, folded it into a thick pad, and dropped to my knees. Tea puddles between the Oriental-rug fibers; I press, blot, rotate, blot again, each motion brisk and practiced. <br><br>Nina kneels beside me, lipstick parted in astonishment. “Such composure,” she breathes, her voice part admiration, part relief. Together we gather the larger shards, setting them on a saucer like puzzle pieces we might someday reassemble. <br><br>Andrew watches from above, arms crossed but silent, the line of his mouth unreadable. I sense rather than see his attention track the efficiency of every swipe. The napkin grows heavy with tea; the room grows heavier with expectation. <br><br>When I lean back on my heels the stain is a faint blotch no bigger than a shadow. Nina’s shoulders drop, exhaling tension. “We keep clumsy things safe here,” she says—odd choice of words—then favors me with a tremulous smile that seems to brighten the entire drawing-room.", 
    imagePromptSeed: "Nina Winchester looking impressed, Millie calmly mopping spill, composure under pressure", 
    choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1A" }
    ]
   },
  "D2_C1_FREEZE_WAIT_RESULT_PATH_D1A": { id: "D2_C1_FREEZE_WAIT_RESULT_PATH_D1A", timelineTitle: "D2→C1: Andrew Mutters (Path D1A)", scenePromptForGemini: "Porcelain detonates; instinct locks my joints. I sit motionless, hands folded in my lap while tea splatters shoes and chair legs. The silence afterward is louder than the crash. <br><br>Nina’s gaze darts to Andrew, apology blooming in her cheeks. He steps forward, nostrils flaring, regards the spreading stain, then me—still composed, awaiting instruction. A muscle feathers in his jaw. <br><br>“Initiative matters,” he mutters, the words soft but edged like honed steel. He stoops, plucks a dagger-shaped shard from the rug, and drops it onto the saucer with a *click* that sounds like a gavel. <br><br>Nina scrambles for a napkin while I finally rise, cheeks hot. My restraint has been judged—and found wanting. Outside, thunder laughs against the eaves. Inside, I swallow the copper taste of regret and remind myself that the next test may come without warning or mercy.", imagePromptSeed: "Andrew Winchester furrowed brow, muttering, Millie frozen, slight disapproval", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1A" }] },

  "D2_A1_SHIELD_NINA_RESULT_PATH_D1B": { id: "D2_A1_SHIELD_NINA_RESULT_PATH_D1B", timelineTitle: "D2→A1: Andrew Approves (Path D1B)", scenePromptForGemini: "Instinct ignites: I vault from the chair, angle my body between Nina and the shrapnel burst of china. A jagged crescent clips my sleeve, slicing fabric and raising a welt, but Nina’s cashmere stays pristine. <br><br>The scent of hot chamomile mingles with the metallic tang still ghosting my fingertips from that lone kitchen knife. Andrew’s shoulders drop a fraction—the first exhale of a man who expected chaos and got competence. He offers a curt nod, as if stamping a file *approved*. <br><br>“Quick thinking,” he says, voice pitched low but undeniable. Nina’s pupils dilate; she grips my wrist with unexpected strength. “You saved my favorite cup,” she whispers—yet the gratitude in her tone suggests I saved far more than porcelain.", imagePromptSeed: "Andrew Winchester nodding approvingly, Millie shielding Nina, subtle gesture", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1B" }] },
  "D2_B1_MOP_SPILL_RESULT_PATH_D1B": { id: "D2_B1_MOP_SPILL_RESULT_PATH_D1B", timelineTitle: "D2→B1: Nina Praises (Path D1B)", scenePromptForGemini: "Chair legs screech as I dive for the linen napkin, folding it twice before the saucer hits floor. Knees to rug, I blot the spreading amber with machine precision: press, rotate, absorb, repeat. The smell is all chamomile and distant electricity, a reminder of the generator hum I tracked in the kitchen. <br><br>Nina kneels too, hands fluttering uselessly until she realises the stain is already shrinking beneath my methodical passes. “Your composure is… extraordinary,” she breathes, as though I’ve conjured calm from the ether. <br><br>Andrew studies the scene, arms crossed. His silence feels like an audit; then, at last, the faintest upward curve tugs his mouth. Approval or relief? Hard to say, but I’ll bank either. <br><br>When I rise, napkin heavy with tea, the rug bears only a faint watermark—an echo that will vanish by morning. Nina straightens her skirt and gifts me a smile warm enough to outshine the chandelier.", imagePromptSeed: "Nina Winchester looking impressed, Millie calmly mopping spill, composure under pressure", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1B" }] },
  "D2_C1_FREEZE_WAIT_RESULT_PATH_D1B": { id: "D2_C1_FREEZE_WAIT_RESULT_PATH_D1B", timelineTitle: "D2→C1: Andrew Mutters (Path D1B)", scenePromptForGemini: "The cup explodes; I stay seated, spine straight, hands folded, waiting for protocol. Tea freckles my shoes, the same pair that squelched across kitchen tiles minutes ago. <br><br>Andrew’s gaze swivels from the mess to me, measuring the gap between awareness and action. His jaw tightens; thunder chooses that moment to slap the roof. “Initiative matters,” he mutters, each consonant calibrated to bruise. <br><br>He stoops, lifts a fang-shaped shard, and places it on a saucer with surgical precision. Nina scrambles for a napkin while apologies spill faster than tea. I rise, cheeks hot, certain the metallic bite I taste is not chamomile but regret. <br><br>The chandelier flickers once, as if the house itself is marking a failed test. I vow the next trial—whatever it is—will not catch me idle.", imagePromptSeed: "Andrew Winchester furrowed brow, muttering, Millie frozen, slight disapproval", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1B" }] },

  "D2_A1_SHIELD_NINA_RESULT_PATH_D1C": { id: "D2_A1_SHIELD_NINA_RESULT_PATH_D1C", timelineTitle: "D2→A1: Andrew Approves (Path D1C)", scenePromptForGemini: "Reflex eclipses thought: I spring up, arm sweeping across Nina’s torso as shards flare past like white shrapnel. One splinter grazes the back of my hand; a bright sting, nothing more. The portraits on the wall capture the lunge in a hundred oil-gloss mirrors, their painted eyes wide as if witnessing déjà-vu. <br><br>Andrew’s baritone rumbles from the doorway—just one syllable, “Good,” but it lands with the authority of a stamp on vellum. Nina’s palm settles over her racing heart, lips parted in a silent *oh*. <br><br>The shard-sprayed carpet looks like a field of broken halos. I straighten, pulse drumming in my ears, aware that somewhere behind me an empty picture frame still hangs like an accusation. Tonight, at least, I’ve placed myself between danger and its chosen target—and Andrew Winchester has seen it.", imagePromptSeed: "Andrew Winchester nodding approvingly, Millie shielding Nina, subtle gesture", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1C" }] },
  "D2_B1_MOP_SPILL_RESULT_PATH_D1C": { id: "D2_B1_MOP_SPILL_RESULT_PATH_D1C", timelineTitle: "D2→B1: Nina Praises (Path D1C)", scenePromptForGemini: "The cup leaves Nina’s hand, and I’m moving even before gravity finishes the theft. Linen napkin, exact fold, knees to parquet—press, lift, rotate, repeat. Tea rushes into the cloth like a confession. <br><br>The missing portrait frame behind me reflects in a puddle no larger than a silver dollar; for an instant the blank rectangle seems to watch my efficiency. I swipe once more and the tea is tamed, stain reduced to a pale ghost in the weave. <br><br>Nina releases a breath that sounds suspiciously like *finally.* “Remarkable composure,” she says, voice half-whisper. Andrew’s expression softens one notch—an auditor pleased by balanced books. <br><br>I rise, folding the napkin so the damp side is hidden, and place it on the saucer like a signed receipt. Somewhere overhead the attic bangs again, but no one acknowledges it. Courtesy, it seems, can silence bigger messes than spilled tea.", imagePromptSeed: "Nina Winchester looking impressed, Millie calmly mopping spill, composure under pressure", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1C" }] },
  "D2_C1_FREEZE_WAIT_RESULT_PATH_D1C": { id: "D2_C1_FREEZE_WAIT_RESULT_PATH_D1C", timelineTitle: "D2→C1: Andrew Mutters (Path D1C)", scenePromptForGemini: "Porcelain detonates against the floorboards, yet I remain statue-still, entrapped by etiquette—by the worry that moving might anger the very eyes I felt tracking me in those paintings. Tea arcs onto my shoes, amber beads rolling off leather like rejected tears. <br><br>Andrew steps forward, casting a long, stern shadow into the spill. He plucks a fang-shaped shard between thumb and forefinger, studies its razor edge, then lets it ping into the saucer. “Initiative matters,” he mutters—same words the portraits seemed to whisper earlier. <br><br>Nina gathers napkins in trembling fists, trying to staunch the spreading stain herself. Shame heats my face; the portraits appear to lean closer, judging. <br><br>Thunder growls overhead, the chandelier flickers, and I vow—silently, fiercely—that the next test the Winchesters stage will not catch me inert.", imagePromptSeed: "Andrew Winchester furrowed brow, muttering, Millie frozen, slight disapproval", choices: [{ text: "Continue...", nextSceneId: "T9_DOWNPOUR_GENERATOR_PATH_D1C" }] },

  // --- SHARED BEAT AFTER D2 (Paths for D1A, D1B, D1C context) ---
  "T9_DOWNPOUR_GENERATOR_PATH_D1A": { id: "T9_DOWNPOUR_GENERATOR_PATH_D1A", timelineTitle: "T9: Downpour (Path D1A)", scenePromptForGemini: "The moment dessert plates vanish, the rain decides politeness is overrated. It slams the mansion in sheets so dense the windows blanch white, then rattle as if begging to come inside. A flash of lightning freezes the foyer; the scratch on the attic door resurfaces in my mind, a fresh wound throbbing overhead. <br><br>The house sighs. Lights gutter once, twice, and finally surrender. A heartbeat later, something deep in the bowels of the estate coughs alive—one mechanical stumble, then a steady rumble like a caged lion settling. The backup generator. <br><br>The floors vibrate in time with the engine’s pulse; the chandelier crystals chime a nervous accompaniment. I can taste the exhaust in the air, metallic and warm, masking the perennial lilac. <br><br>Nina collects candle-stubs with shaky hands; Andrew simply listens, head tilted, judging the rhythm of the generator the way others judge a string quartet. Every throb from below feels like Morse code tapped out just for me: *remember what you saw upstairs.*", imagePromptSeed: "Heavy rain against window, dim interior lights stabilize, sound of generator humming", choices: [{ text: "Continue...", nextSceneId: "T10_ATTIC_DOOR_BANG_PATH_D1A" }] },
  "T10_ATTIC_DOOR_BANG_PATH_D1A": { id: "T10_ATTIC_DOOR_BANG_PATH_D1A", timelineTitle: "T10: Attic Door Bang (Path D1A)", scenePromptForGemini: "The generator has settled into a bass-line thrum when the sound erupts—an impact so sudden it seems to lift the roof an inch before dropping it again. *BANG.* <br><br>The noise blooms directly above the service stair I explored earlier. I picture the gouged scratch beside the attic knob, imagine fresh splinters leaping free as something on the far side hurls its weight at the door. Dust drizzles from the ceiling rose, sparkling in the chandelier’s after-shiver. <br><br>Everyone freezes. Nina’s teacup shards, still waiting on the sideboard, tremble in sympathy. Andrew cocks his head, measuring resonance the way a hunter gauges distance. <br><br>The generator hesitates—just a fraction—then roars a decibel louder, as though insulted by competition. In the charged silence that follows, I realise my thumb is pressed to the splinter wound on my palm, counting my own pulse.", imagePromptSeed: "Startled faces of Nina, Andrew, Millie, distant banging sound visualization, tension", choices: [{ text: "Continue...", nextSceneId: "D3_ANDREW_TOUR_WAIT_PATH_D1A" }] },

  "T9_DOWNPOUR_GENERATOR_PATH_D1B": { id: "T9_DOWNPOUR_GENERATOR_PATH_D1B", timelineTitle: "T9: Downpour (Path D1B)", scenePromptForGemini: "Thunderhead bursts pound the roof so hard the rafters creak like ship timbers. Lightning strobes the corridor outside the kitchen, illuminating a single wet footprint I forgot to wipe. <br><br>Without warning the lamps wink out. Darkness swallows the mansion—half a breath only—before a sub-basement motor barks, coughs, and finds its throttle. The generator’s drone threads up through copper plumbing and into my bones; every faucet vibrates like a struck tuning fork. I picture that lone chef’s knife back in the sink, blade jittering in sympathy. <br><br>Emergency sconces flare, colorless and mean, sculpting everyone’s faces into gaunt masks. Nina keeps glancing toward the pantry door, as though expecting someone—or something—to answer the engine’s call. <br><br>The hum settles into a low, relentless mantra. It mutes the storm outside but amplifies the question still ringing in my ears: *Who dropped the knife—and why didn’t they come back for it?*", imagePromptSeed: "Heavy rain against window, dim interior lights stabilize, sound of generator humming", choices: [{ text: "Continue...", nextSceneId: "T10_ATTIC_DOOR_BANG_PATH_D1B" }] },
  "T10_ATTIC_DOOR_BANG_PATH_D1B": { id: "T10_ATTIC_DOOR_BANG_PATH_D1B", timelineTitle: "T10: Attic Door Bang (Path D1B)", scenePromptForGemini: "The storm outside supplies percussion, but the house keeps the melody—until a new note detonates overhead. *WHAM.* A single, percussive blow deep in the structure, so forceful it rattles ladles in the distant kitchen and sends a wet clang through the chef’s knife I left in the sink. <br><br>Generator hum skips, catches, resumes. Emergency sconces flicker. Andrew’s gaze flicks toward the back stairwell that leads up past the servants’ quarters to the locked attic. <br><br>Nina’s hand finds the curve of her throat; her pulse beats visible in the hollow there. “Settling beams,” she offers, voice brittle. The excuse hangs in the air, absurd as a paper umbrella in this downpour. <br><br>A second, softer bump follows—like something repositioning itself behind that first slam. The metallic tang I smelled in the kitchen revisits my tongue, and the room seems to tilt ever so slightly toward whatever waits above.", imagePromptSeed: "Startled faces of Nina, Andrew, Millie, distant banging sound visualization, tension", choices: [{ text: "Continue...", nextSceneId: "D3_ANDREW_TOUR_WAIT_PATH_D1B" }] },

  "T9_DOWNPOUR_GENERATOR_PATH_D1C": { id: "T9_DOWNPOUR_GENERATOR_PATH_D1C", timelineTitle: "T9: Downpour (Path D1C)", scenePromptForGemini: "Rain assaults the stained-glass windows, fracturing candlelight into frantic mosaics that skitter across the portrait gallery. Every painted face seems to wince at each thunder-punch. I spot the empty frame again—its absence now a black hole at the center of the wall. <br><br>Then darkness—so total it erases even memory of color. One, two seconds, and the mansion shakes itself awake: a diesel-rich growl blooms underfoot, building to a steady drone that vibrates the parquet. Generator, alive and hungry. <br><br>Emergency bulbs bloom a wan, corpse-white glow. In it, the remaining portraits appear newly animated, their eyes glittering with the generator’s stolen soul. Andrew checks voltage readouts on a wall panel; Nina whispers something to the empty frame, too low for me to catch. <br><br>The engine’s pulse reverberates through my ribs, synchronizing with my heart. Over its monotone I hear another sound—soft, distant, rhythmic—like someone walking the attic corridor above us. Or perhaps that’s just the generator giving the missing portrait its voice.", imagePromptSeed: "Heavy rain against window, dim interior lights stabilize, sound of generator humming", choices: [{ text: "Continue...", nextSceneId: "T10_ATTIC_DOOR_BANG_PATH_D1C" }] },
  "T10_ATTIC_DOOR_BANG_PATH_D1C": { id: "T10_ATTIC_DOOR_BANG_PATH_D1C", timelineTitle: "T10: Attic Door Bang (Path D1C)", scenePromptForGemini: "Lightning strobes, etching the portrait gallery in x-ray white when the impact comes: *THUD*, then a tremor that quivers through the parquet and up the gilt frames. The single empty frame on the wall shivers most violently, as if receiving the blow through some hidden conduit. <br><br>All eyes—painted and living—tilt ceiling-ward. Dust pirouettes down the stairwell like slow snow. The generator drones on, but its rhythm seems suddenly defensive, a watchdog growling at a door it cannot reach. <br><br>Andrew’s jaw flexes; Nina’s knuckles whiten around the candlestick she’s been fussing with. I find myself counting portraits, half-expecting the missing one to reappear, hammer still in hand. <br><br>No follow-up strike comes—only the pregnant hush that follows an ultimatum. In that silence the house feels less like architecture and more like an organism waiting to see if its heartbeat will resume.", imagePromptSeed: "Startled faces of Nina, Andrew, Millie, distant banging sound visualization, tension", choices: [{ text: "Continue...", nextSceneId: "D3_ANDREW_TOUR_WAIT_PATH_D1C" }] },

  // --- D3 – Andrew proposes an after-dinner house tour. (Nodes specific to D1 context) ---
  "D3_ANDREW_TOUR_WAIT_PATH_D1A": {
    id: "D3_ANDREW_TOUR_WAIT_PATH_D1A",
    timelineTitle: "D3: Tour Proposed (Context D1A)",
    scenePromptForGemini: "Dinner plates still clatter in the butler’s pantry when Andrew pockets a ring of antique keys and motions me into a narrow side corridor. “Wait here—two minutes,” he orders, voice flat as stone. His footsteps recede toward the master stair; the hum of the generator swallows them whole. <br><br>Without Andrew’s gravity, the passage feels twice as long. Sconces flicker an anemic gold over wallpaper patterned with climbing roses that look oddly carnivorous in low light. In the hush I hear my own pulse, and—somewhere overhead—a slow drag of furniture across attic planks. <br><br>Nina lingers five paces away, arms folded tight, perfume barely masking the metallic tang of storm-air. I sense the tension still coiled in her from the teacup fiasco; the way her shoulders jerk at every creak tells me she heard that attic bang as clearly as I did. <br><br>I have maybe one-hundred-and-twenty seconds. Do I lean close and ask what she’s hiding behind that door? Do I text Tess a quick *Made it*—assuming the storm hasn’t murdered the signal? Or do I study the family photo wall opposite us: gilt frames crowding a portrait of Andrew as a boy, his smile already wary, the background suspiciously blurred?",
    imagePromptSeed: "Millie alone in dark corridor, waiting, thoughtful expression, sense of unease",
    choices: [
      { text: "Whisper-ask Nina about the attic noise.", nextSceneId: "D3_A2_NINA_ANSWERS_TENSELY_RESULT" }, // D1A context leads to tense answer
      { text: "Text best friend Tess (“Made it!”).", nextSceneId: "D3_B2_TEXT_TESS_NO_SERVICE_RESULT" },
      { text: "Examine the family photo wall.", nextSceneId: "D3_C2_PHOTO_WALL_MISSING_FRAME_RESULT" } // D1A context, no special frame recognition
    ]
  },
  "D3_ANDREW_TOUR_WAIT_PATH_D1B": {
    id: "D3_ANDREW_TOUR_WAIT_PATH_D1B",
    timelineTitle: "D3: Tour Proposed (Context D1B)",
    scenePromptForGemini: "Andrew’s coat still drips on the foyer tiles when he strides off to fetch the “proper” ring of keys, leaving Nina and me in a servants’ passage that smells of beeswax and distant diesel. Emergency bulbs hum overhead, tinting everything a sickroom white. <br><br>Nina smooths her skirt, reclaiming composure with each stroke. She has been briskly dismissive all evening—first of the attic noise, then of the shattered china—and her right foot now taps a metronome of impatience. <br><br>The silence magnifies small sounds: water ticking down the radiator, a pan settling in the empty kitchen, the faint metallic *ping* as that forgotten chef’s knife cools. A gallery of family photos lines the adjacent wall. Most images are stiff-posed generational wealth, but halfway down is the imprint of a missing frame—dust halo, two nail heads, nothing else. <br><br>Two minutes to kill. I could whisper-probe Nina about the thunderous knock overhead, risk another curt deflection. I could fish out my phone and try to text Tess—though the *NO SERVICE* banner will likely mock me. Or I could inspect that photo wall, search the vacant outline for clues: what picture once hung there, and why has it disappeared?",
    imagePromptSeed: "Millie alone in dark corridor, waiting, thoughtful expression, sense of unease",
    choices: [
      { text: "Whisper-ask Nina about the attic noise.", nextSceneId: "D3_A2_NINA_ANSWERS_DISMISSIVELY_RESULT" }, // D1B context leads to dismissive answer
      { text: "Text best friend Tess (“Made it!”).", nextSceneId: "D3_B2_TEXT_TESS_NO_SERVICE_RESULT" },
      { text: "Examine the family photo wall.", nextSceneId: "D3_C2_PHOTO_WALL_MISSING_FRAME_RESULT" } // D1B context, no special frame recognition
    ]
  },
  "D3_ANDREW_TOUR_WAIT_PATH_D1C": {
    id: "D3_ANDREW_TOUR_WAIT_PATH_D1C",
    timelineTitle: "D3: Tour Proposed (Context D1C)",
    scenePromptForGemini: "Keys jangling like distant tambourines, Andrew retreats toward the main stairwell, leaving Nina and me beneath a row of ancestral portraits whose varnished eyes glimmer in generator light. The empty rectangle—ghost of a frame I recognised earlier—looms beside them, its absence louder than any painting present. <br><br>Lightning flashes through a lancet window at the corridor’s end, throwing our silhouettes across wainscoting. Nina’s earlier dismissal of the attic noise rings false now; she flinches at a soft *thump* from above, palms smoothing invisible creases in her blouse. <br><br>The generator’s drone seeps through floorboards, but under it I swear I hear measured pacing directly overhead, as though someone is walking the attic’s length, counting boards. The portraits seem to tilt, listening with me. <br><br>Two minutes tick like slow hail. Option one: murmur a question about that bang—see if Nina’s mask cracks. Option two: open my phone for the comfort of Tess’s sarcasm, gambling on a signal the storm probably strangled. Option three: give the photo wall my full attention, match the missing frame’s ornate scrollwork to the foyer painting whose eyes followed me earlier, and wonder who removed the link—and why.",
    imagePromptSeed: "Millie alone in dark corridor, waiting, thoughtful expression, sense of unease",
    choices: [
      { text: "Whisper-ask Nina about the attic noise.", nextSceneId: "D3_A2_NINA_ANSWERS_DISMISSIVELY_RESULT" }, // D1C context leads to dismissive answer
      { text: "Text best friend Tess (“Made it!”).", nextSceneId: "D3_B2_TEXT_TESS_NO_SERVICE_RESULT" },
      { text: "Examine the family photo wall.", nextSceneId: "D3_C2_PHOTO_WALL_RECOGNIZES_FRAME_RESULT" } // D1C context, recognizes frame
    ]
  },

  // D3 Branches Results
  "D3_A2_NINA_ANSWERS_TENSELY_RESULT": {
    id: "D3_A2_NINA_ANSWERS_TENSELY_RESULT",
    timelineTitle: "D3→A2: Nina's Tense Answer",
    scenePromptForGemini: "I lower my voice. “Mrs Win—Nina… earlier, upstairs—did you hear a bang near the attic?” <br><br>Her whole posture tightens, shoulders drawing up like a marionette yanked on too many strings. “Old houses complain in storms,” she says, every syllable pre-measured. “Foundation settling, loose shutters—nothing more.” <br><br>Yet her eyes betray the script: pupils pinched, stare fixed over my shoulder as though replaying whatever struck that door. A pulse flutters in her throat; her next breath scrapes out thin. <br><br>“Best not to dwell,” she adds, voice low enough that the wallpaper seems to lean in to listen. One manicured hand clasps mine for half a heartbeat—warm, sweating, desperate—before she steps back and pretends the touch never happened. <br><br>Andrew’s footfalls echo down the grand stair, keys jangling like verdicts. Conversation snaps shut, but the tension Nina tried to hide lingers, sharp as fresh splinters beneath a coat of paint.", // Because path came via D1A
    imagePromptSeed: "Nina Winchester looking tense and evasive, whispering, sidelong glance, Millie suspicious",
    choices: [
      { text: "Continue...", nextSceneId: "T11_BLACKOUT" }
    ]
  },
  "D3_A2_NINA_ANSWERS_DISMISSIVELY_RESULT": {
    id: "D3_A2_NINA_ANSWERS_DISMISSIVELY_RESULT",
    timelineTitle: "D3→A2: Nina's Dismissive Answer",
    scenePromptForGemini: "“That crash upstairs?” I murmur. “Sounded… heavy.” <br><br>Nina waves a perfumed hand as though batting at gnats. “The roof timbers swell whenever it pours. Perfectly normal. Andrew insists on annual inspections.” <br><br>Her smile is present but vacant, like a shop window after closing time. She plucks an invisible thread from her sleeve, attention already drifting. <br><br>“Honestly,” she says, softer, “the house is louder than any guest.” The implication: drop the subject. <br><br>She pivots toward the foyer just as Andrew’s silhouette reappears, keys chiming. Whatever questions I still nurture flatten under the unreceptive curve of her shoulders.", // Because path came via D1B or D1C
    imagePromptSeed: "Nina Winchester looking dismissive, slight wave of hand, Millie uncertain",
    choices: [
      { text: "Continue...", nextSceneId: "T11_BLACKOUT" }
    ]
  },
  "D3_B2_TEXT_TESS_NO_SERVICE_RESULT": {
    id: "D3_B2_TEXT_TESS_NO_SERVICE_RESULT",
    timelineTitle: "D3→B2: No Service",
    scenePromptForGemini: "I tug out my phone, thumbs primed to text **Tess – Made it. Mansion insane!** <br><br>The signal bar spins, then resolves into a single unforgiving verdict: **NO SERVICE**. No 4G, no Wi-Fi, just a blinking slash through the antenna icon. <br><br>Outside, thunder guffaws at my surprise. Indoors, the generator’s drone muffles everything except my rising pulse. I half-raise the phone toward a window, the gesture both futile and absurd—it might as well be a flare gun underwater. <br><br>The wallpaper roses seem to smirk; the portraits pretend not to notice. I drop the handset back into my pocket, keenly aware that whatever happens next, the mansion has cut the phone lines to the world beyond its gates.",
    imagePromptSeed: "Close up on cellphone screen showing 'NO SERVICE', Millie's frustrated face, storm raging outside window",
    choices: [
      { text: "Continue...", nextSceneId: "T11_BLACKOUT" }
    ]
  },
  "D3_C2_PHOTO_WALL_MISSING_FRAME_RESULT": {
    id: "D3_C2_PHOTO_WALL_MISSING_FRAME_RESULT",
    timelineTitle: "D3→C2: Missing Photo Frame",
    scenePromptForGemini: "The gallery wall bristles with heritage: sepia weddings, yacht christenings, silver-framed baby portraits. Halfway down, an empty rectangle interrupts the lineage—dusty outline, two orphan nail heads, nothing else. <br><br>The gap feels surgical, as if someone excised a tumor from the family’s public history. A faint halo darkens the wallpaper where sunlight once aged the missing glass. <br><br>I lean closer. The patterned paper beneath is pristine, no fading, no smoke stain—removal recent. Why strip one image while leaving generations intact? <br><br>A floorboard pops behind me; I jerk back, heart ricocheting. Nina pretends not to see my scrutiny, but her gaze skates across the vacancy with practiced indifference. The omission speaks louder than any portrait still hanging.", // Because path came via D1A or D1B
    imagePromptSeed: "Wall with family photos, distinct empty outline of a missing frame, dust marks, Millie pondering",
    choices: [
      { text: "Continue...", nextSceneId: "T11_BLACKOUT" }
    ]
  },
  "D3_C2_PHOTO_WALL_RECOGNIZES_FRAME_RESULT": {
    id: "D3_C2_PHOTO_WALL_RECOGNIZES_FRAME_RESULT",
    timelineTitle: "D3→C2: Recognizes Frame Style",
    scenePromptForGemini: "Rows of gilt frames gleam under the emergency bulbs, but my attention beelines to the void: a perfect dust-print where a photograph once lived. The ornate scrollwork pattern matches the frame of the foyer portrait whose eyes followed me earlier. <br><br>I kneel for a better look. Minute chips of fresh gilt cling to the nail heads—evidence of hurried removal. On the skirting board below, a single shard of beveled glass catches the light. I pocket it instinctively, a breadcrumb in case the forest gets darker. <br><br>Lightning flashes; in its glare the surrounding portraits seem to recoil from the vacancy, as though the missing image held something none of them wished to witness. <br><br>Nina notices my crouch and inserts herself between me and the wall, smile rigid. “Some pieces are out for restoration,” she offers. The lie is too smooth, polished like marble hiding cracks. <br><br>She herds me back to center corridor just as Andrew arrives with keys in fist, but my mind is already painting the vanished picture—same eyes, same frame, rescued or hidden, and very much not absent by accident.", // Because path came via D1C
    imagePromptSeed: "Wall with family photos, missing frame outline, Millie's face showing recognition and suspicion, connection to foyer art",
    choices: [
      { text: "Continue...", nextSceneId: "T11_BLACKOUT" }
    ]
  },

  // --- CHAPTER-END SYNCHRONISER (all branches converge) ---
  "T11_BLACKOUT": {
    id: "T11_BLACKOUT",
    timelineTitle: "T11: Total Blackout",
    scenePromptForGemini: "The generator holds steady for nearly an hour, its heartbeat thudding through parquet and plaster—until it doesn’t. A gutteral cough lurches up from the sub-basement, followed by a metallic clank like a thrown wrench, and then a stuttering wheeze that stops mid-breath. <br><br>The lights blink out all at once, as though a giant thumb has smothered every filament in the house. Darkness blooms so suddenly it feels liquid, sluicing across carpets, climbing the wainscoting, flooding lungs. <br><br>Sound collapses with the light: no hum, no storm, only the microscopic rasp of air leaving mouths too stunned to inhale again. For a heartbeat I can hear the wet click of my own eyelids. <br><br>The lilac scent vanishes, replaced by the raw musk of overheated diesel and dust ripped from ancient rafters. Somewhere, a teacup shard settles with a crystalline ping that echoes like a gunshot in a mausoleum. <br><br>Outside, thunder backhands the roof, but indoors the vacuum holds—waiting, testing, deciding which of us will speak first. I do not dare offer the darkness my voice.",
    imagePromptSeed: "Pitch black screen, faint sound of generator dying, sudden darkness, shock",
    choices: [
      { text: "Continue...", nextSceneId: "T12_SCREAM_CLIFFHANGER" }
    ]
  },
  "T12_SCREAM_CLIFFHANGER": {
    id: "T12_SCREAM_CLIFFHANGER",
    timelineTitle: "T12: A Scream in the Dark",
    scenePromptForGemini: "Seconds stretch elastic in the pitch. Someone inhales—a ragged, watery drag—followed by the papery flutter of Nina’s fingers searching for mine. I open my mouth to whisper *I’m here*, but the words never surface. <br><br>Because the mansion finds its voice first. <br><br>A scream erupts from somewhere indeterminate—too close to be attic, too muffled to be foyer, as if torn from the very marrow between floors. Feminine, yes, but flayed of all civil shape, the sound of an animal discovering it is trapped in a human throat. <br><br>The cry ricochets down corridors, ricochets back, folds in on itself until the darkness feels furred with panic. Then, just as abruptly, silence pours in, blacker and heavier than before—as though the house has swallowed the noise whole and is licking its chops.",
    imagePromptSeed: "Darkness, sound waves of a scream, question mark, terror, unseen horror",
    isEnding: true,
    endingType: "neutral", // Chapter cliffhanger, not a win/lose
    message: "The chapter ends on a bloodcurdling scream, its source hidden by the sudden darkness...",
    choices: [] // No choices, this is an ending node for the chapter
  }
};

// Helper to access the start node ID, as it's defined within the tree itself.
// This is not strictly necessary if START_NODE_ID in constants.ts is always updated,
// but can be a safeguard or for internal logic if needed.
export const ACTUAL_START_NODE_ID = "T0_HR_EMAIL";
if (!housemaidStoryData[ACTUAL_START_NODE_ID]) { // Updated variable name here
  console.error(`CRITICAL: START_NODE_ID ("${ACTUAL_START_NODE_ID}") in storyTree.ts does not match any defined node ID!`);
}
