-- Insert 8 new paintings
INSERT INTO paintings (title, description, story, price, dimensions, collection, image_url, medium, material, is_available) VALUES
($$Pisces Embrace: Indigo Madhubani$$,
$$Two koi-like fish curl into a kissing embrace at the centre of a deep cobalt pond, their scales hatched in fine black ink against the radiant blue.
A patterned border of triangles and ruby beads frames the composition in true Madhubani tradition.
Pink lotus accents at the gills add a quiet note of bloom amid the swirling water, symbolising love, fertility and abundance.$$,
$$Inspired by the Mithila motif of paired fish — symbols of devotion and prosperity — rendered in saturated indigo to evoke the sacred ponds of Bihar.$$,
7800.00, $$11" × 15"$$, $$Cultural Chronicles$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/madhubani-koi-pair-indigo.jpg',
'Ink and Acrylic', 'Paper', true),

($$Saffron Lotus Trio: Mithila Bloom$$,
$$Three stylised lotus heads bloom in vertical procession down a saffron-yellow panel, each crowned with intricately hatched petals and dotted bands.
Flanking borders burst with chrysanthemum-like blossoms on curling black vines, balancing the central golden column with ornamental restraint.
The composition reads like a sacred manuscript page — geometric, devotional, and rich in folk symbolism.$$,
$$A meditation on the threefold lotus motif of Madhubani art, traditionally painted on village walls during harvest and wedding rituals.$$,
7200.00, $$11" × 15"$$, $$Cultural Chronicles$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/madhubani-saffron-lotus-trio.jpg',
'Ink and Acrylic', 'Paper', true),

($$Pink Lotus: Pond Reverie$$,
$$A single pink lotus blooms in luminous detail above broad emerald lily pads, its petals softly streaked with white and crimson.
The watercolour pond behind it dissolves into mossy greens, ochres and quiet ripples, capturing the still hush of late afternoon.
Tiny green pods float at the lower edge, grounding the bloom in the layered ecology of the pond.$$,
$$Painted from observation at a temple pond, this study honours the lotus as both botanical wonder and spiritual symbol of awakening.$$,
6500.00, $$8" × 12"$$, $$Nature's Palette$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/watercolor-pink-lotus-pond.jpg',
'Watercolor', 'Paper', true),

($$Radha-Krishna: Grove of the Flute$$,
$$Krishna lifts his flute beneath a canopy of palm and peacock feathers while Radha listens, draped in vivid yellow and crimson stripes.
Around them, peacocks unfurl their plumes and a coiled serpent rests on lotus blossoms — every inch of the composition alive with Mithila pattern and colour.
Saffron borders of zigzag and tribal motifs enclose the lovers in a sacred theatrical frame.$$,
$$A devotional Madhubani retelling of the eternal divine romance, painted in the traditional palette of Mithila wedding art.$$,
9500.00, $$11" × 15"$$, $$Cultural Chronicles$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/madhubani-radha-krishna-grove.jpg',
'Ink and Acrylic', 'Paper', true),

($$Coral Roses: Watercolor Bouquet$$,
$$A loose, joyful bouquet of coral and sunflower-yellow roses rises on slender green stems, with smaller buds peeking between the larger blooms.
Watercolour pigments bleed softly through each petal, suggesting form without sealing the edges.
Deep emerald leaves anchor the airy composition, giving the arrangement a buoyant lift against the pale ground.$$,
$$A study in spontaneity — painted in a single sitting to capture the casual grace of garden roses cut and gathered in a glass.$$,
4500.00, $$10" × 12"$$, $$Nature's Palette$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/watercolor-rose-bouquet-coral.jpg',
'Watercolor', 'Paper', true),

($$Ember Stallion: Expressive Steed$$,
$$A horse's head emerges from the white field in fluid strokes of burnt orange, cobalt and slate, its mane lifting in pale wind.
The brushwork is loose and gestural — colour pooling and dripping to suggest both the animal's restless spirit and its quiet poise.
Cool blue shadows along the muzzle anchor the warmth of the russet coat, lending the portrait a luminous, painterly intensity.$$,
$$An expressionist study capturing the soul of a stallion through colour and gesture rather than literal detail.$$,
5800.00, $$10" × 14"$$, $$Portraits and Personalities$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/expressive-horse-ember-portrait.jpg',
'Watercolor', 'Paper', true),

($$Tree of Life: Birds and Beasts$$,
$$A patterned tree rises at the centre, its branches dotted with leaves, fruits and a chorus of crimson and saffron birds in fine ink detail.
At the base, a yellow serpent coils on one side while a stylised peacock-like creature stands sentinel on the other, completing the cosmic balance.
Scalloped vermillion borders enclose the scene with rhythmic geometry, a hallmark of traditional Mithila composition.$$,
$$A classic Madhubani Tree of Life, symbolising fertility, harmony and the interconnectedness of all living beings.$$,
8500.00, $$11" × 15"$$, $$Cultural Chronicles$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/madhubani-tree-of-life-birds.jpg',
'Ink and Acrylic', 'Paper', true),

($$Twin Fish: Vermillion Madhubani$$,
$$Two ornate fish curve toward each other across a sun-yellow field, their scales rendered in alternating bands of crimson, white and inked hatch-work.
Trailing vines, leaves and red lotus blossoms weave between them, framed by dual borders of striped fans and tulip-like flowers.
The composition celebrates union, abundance and the auspicious symbolism of paired fish in Mithila art.$$,
$$A bridal-tradition Madhubani painting, traditionally given to bless newlyweds with prosperity and devotion.$$,
8200.00, $$15" × 11"$$, $$Cultural Chronicles$$,
'https://pygdbeagoiokadidwpvi.supabase.co/storage/v1/object/public/paintings/madhubani-twin-fish-vermillion.jpg',
'Ink and Acrylic', 'Paper', true);

-- Expand short descriptions (one update per painting)
UPDATE paintings SET description = $$A charcoal study of a woman seated with her back turned, captured in fluid, gestural strokes that hint at form rather than describe it.
Soft smudges and bold contour lines build a sense of stillness and quiet contemplation.
The negative space around her becomes part of the figure, drawing the viewer into a private moment of repose.$$ WHERE id = 'a2d8e85e-e8a4-493e-9ac1-57f2b35ea0a1';

UPDATE paintings SET description = $$A luminous moon and its perfect reflection split a horizon of burnt sienna and midnight blue.
The water beneath holds the light like polished amber, doubling the sky in quiet symmetry.
Soft horizontal washes evoke a hush over the landscape, where solitude feels both vast and intimate.$$ WHERE id = '4e6d2c17-72a1-46a2-aa96-8455d921a850';

UPDATE paintings SET description = $$An expressive abstract horse rendered in cobalt and crimson against a textured sky-blue field.
Bold, sweeping strokes capture motion and untamed spirit rather than literal anatomy.
The clash of warm and cool tones gives the figure an electric, almost mythic presence.$$ WHERE id = '671b7e32-2b79-4fdf-8510-2cfd812ff5d3';

UPDATE paintings SET description = $$A Madhubani-style profile of the Goddess holding her trishul, adorned with crimson floral jewelry.
Fine ink hatch-work shapes her crown and garments, framed by traditional patterned borders.
Vermillion and ochre tones lend the portrait a fierce, devotional intensity rooted in Mithila ritual art.$$ WHERE id = '46cb0fc3-ea70-439f-b018-e8bc4bb39344';

UPDATE paintings SET description = $$Three blush-pink roses rendered in thick, expressive impasto strokes against a deep emerald ground.
The palette knife builds petals as ridges of colour, almost sculptural in their physicality.
Light catches the raised paint, giving the blooms a tactile glow that feels almost alive.$$ WHERE id = 'eed5041b-636f-4edf-8999-9f8311d48203';

UPDATE paintings SET description = $$A lone tree bursts into vivid red blossom above rolling indigo hills and a meadow of green and gold.
The composition celebrates the quiet drama of a single life standing tall against a vast, patterned land.
Bold colour blocks lend the scene a folk-art simplicity charged with emotional weight.$$ WHERE id = 'f5cb9122-a2ee-4586-9302-0ca08a146767';

UPDATE paintings SET description = $$A Kalamkari-inspired portrait of a divine archer drawing her bow amidst cascading vines and blossoms.
Earthy reds, indigos and golds echo the natural dye palette of the traditional South Indian craft.
Fine linework details her ornaments and garments, anchoring the figure in mythic stillness.$$ WHERE id = 'd4e901ae-ea07-4bac-b347-50a77bd5e9b7';

UPDATE paintings SET description = $$A solitary tower silhouetted against an indigo dusk, with embers of orange light bleeding into the horizon.
The lone structure feels both sentinel and companion to the dimming sky.
Layered washes of dark blue and ember evoke the stillness of a day quietly turning into night.$$ WHERE id = 'fec58934-37c2-4ee5-84ff-e04f3d6b3b65';

UPDATE paintings SET description = $$A stylised bird in saffron and ochre against deep indigo, fragmented into geometric petals and orbiting moons.
The cubist treatment turns the figure into a constellation of warm and cool shapes.
Layered planes suggest both flight and the dream of flight, a quiet myth set in modernist code.$$ WHERE id = '360758a7-e2d4-4ca3-a6e4-e84f8e4bdd79';

UPDATE paintings SET description = $$A dense, textural pour where crimson, cobalt and emerald break through a stormy black ground in dramatic eddies.
Pigments collide and bloom, creating a sense of weather, motion and barely-contained energy.
The surface invites the eye to wander through layered chaos in search of fleeting harmony.$$ WHERE id = '45b8aa16-172e-4e81-8740-26fef23e9967';

UPDATE paintings SET description = $$Three apples — two crimson, one verdant green — hang from a slender branch against a wash of lilac and turquoise.
The composition feels deliberately simple, like a haiku in paint.
Delicate brushwork on the leaves contrasts with the bold roundness of the fruit, balancing weight and grace.$$ WHERE id = '3db8af41-dba1-4503-968d-6e34e4aa7d4b';

UPDATE paintings SET description = $$Two weathered tugboats moored against a glowing harbour skyline, their silhouettes set against a watercolour sunset.
Reflections shimmer across the still water, doubling the warm city lights.
The painting captures that hush at day's end when working boats fall quiet and the harbour exhales.$$ WHERE id = 'e49ac0a2-82d1-4bcb-8635-c7c53667223a';

UPDATE paintings SET description = $$A vibrant folk-style Ganesha seated upon his vahana, the mouse, surrounded by peacock feathers and ceremonial offerings.
Bright reds, greens and golds animate every inch of the composition with devotional joy.
Patterned borders and fine ink details root the painting firmly in living folk tradition.$$ WHERE id = 'b161d3ca-f7ee-4f43-923f-548c02176335';

UPDATE paintings SET description = $$A traditional Madhubani composition with paired fish, lotuses, and intricate geometric borders rendered in crimson and ink.
Each scale and petal is detailed by hand, building a layered tapestry of sacred symbols.
The painting honours fertility, devotion and the abundance celebrated in Mithila wedding art.$$ WHERE id = 'f14ce86a-09c6-444e-93c7-6524fe471bbb';

UPDATE paintings SET description = $$Two amber poppies sway against a vivid cerulean field in this miniature acrylic study.
Tiny, jewel-like and full of warmth, the blooms feel almost tactile in their saturation.
The intimate scale invites you closer, rewarding patient attention with bold colour and quiet detail.$$ WHERE id = 'b6541228-adde-4209-9abc-111e1b0ebdc2';

UPDATE paintings SET description = $$A vibrant single cerulean flower nestled among layered green leaves on a white miniature canvas.
Bold colour at intimate scale gives the bloom an outsized presence.
Crisp brushwork and clean negative space lend the composition a contemporary, almost graphic energy.$$ WHERE id = 'c94a003c-9d65-45cd-bce6-e0ba9eca3933';

UPDATE paintings SET description = $$A painted village scene of cottages beside a winding blue river, an arched stone bridge, and bare trees beneath a violet sky.
The dusk palette of muted plums and indigos lends the hamlet a quiet, storybook calm.
Soft brushwork suggests gathering mist and the hush of a settlement preparing for night.$$ WHERE id = '59c58c71-91d4-4f8f-bac8-73c38ef708f0';

UPDATE paintings SET description = $$A blush rose in painterly strokes blooms against a saturated cobalt background.
A miniature study of contrast and quiet drama, the bloom seems to glow against the deep blue field.
Fine impasto edges give the petals subtle dimension, rewarding a closer look.$$ WHERE id = 'bb0f2766-b1ad-4755-947c-1eec34ac73b8';

UPDATE paintings SET description = $$A poised figure in a flowing white drape cradles a bouquet of pink blossoms, framed by lush florals against an amber backdrop.
Soft brushwork lends her presence both grace and quiet strength.
The warm palette and floral embrace turn the portrait into a meditation on tenderness and bloom.$$ WHERE id = 'fc31ddca-7aa1-43a6-80c8-d9b2b1b0f9f1';

UPDATE paintings SET description = $$A mini abstract pour where chartreuse, turquoise, and lilac swirl across a textured canvas like wildflowers caught in a stream.
Pigments mingle without resolving, suggesting growth, motion and unbounded spring energy.
The intimate format makes the burst of colour feel like a private spell of joy.$$ WHERE id = 'ce85a94c-9191-4a75-9c0c-d6dc25330110';

UPDATE paintings SET description = $$A watercolour landscape of a leafy tree leaning over a glowing river at dusk, with distant figures gathering at the water's edge.
Warm reflections shimmer across the calm surface, holding the last of the daylight.
The scene feels suspended in a quiet hush, a painted memory of a familiar evening.$$ WHERE id = 'e3fb0cd3-d67c-4b2a-877f-9f585d9b2268';

UPDATE paintings SET description = $$A patterned sea turtle glides through a cobalt cosmos circled by suns and moons, blending folk symbolism with celestial imagination.
Fine hatch-work decorates its shell like a star map etched in ink.
The composition turns an ancient creature into a quiet voyager of myth and sky.$$ WHERE id = '944f5112-9e26-4767-baeb-8143bb512e11';

UPDATE paintings SET description = $$A delicate single iris in violet and chartreuse blooms across a quiet white field.
Pigment bleeds and fine droplets capture the bloom mid-breath, alive with watercolour spontaneity.
The painting feels like a held inhale — a single flower honoured with gentle attention.$$ WHERE id = 'cfb8054e-1857-4b83-9308-7451ad7c9800';

UPDATE paintings SET description = $$A heavily textured abstract pour evoking deep cosmic terrain — molten reds, electric yellows, indigo and pink fold into a tactile, mineral surface.
Layers of pigment crackle and gather like the skin of a distant planet.
The painting invites the eye to wander unfamiliar geographies of colour and matter.$$ WHERE id = '06a0be10-8922-462a-859b-68a77ee8648c';

UPDATE paintings SET description = $$A vivid red bloom anchors a decorative pink composition with paisley scrolls, ribbons and leaves.
A folk-pattern miniature with contemporary energy, every inch ornamented with detail.
The piece reads like a textile fragment translated into paint, joyful and densely alive.$$ WHERE id = '8e333972-2ac5-4f37-9b7e-9e148fd6ffcb';

UPDATE paintings SET description = $$A wistful portrait of a woman in a saffron cloche hat, framed by an indigo backdrop and turquoise leaves.
Watercolor washes lend her a vintage, romantic mood, soft around the edges yet steady at the centre.
Her gaze feels turned slightly inward, holding a quiet story the painting refuses to fully reveal.$$ WHERE id = 'b0609211-699a-4369-a853-ed4c1c95f4fe';

UPDATE paintings SET description = $$A close-cropped portrait in pop-art style — wide blue eyes, dramatic brows and crimson lips against a teal backdrop.
Bold, expressive and unapologetic, the figure stares back with confident presence.
Flat colour planes and crisp linework give the composition a graphic, magazine-cover energy.$$ WHERE id = 'df197c86-04a3-4157-986d-8c3428c94896';

UPDATE paintings SET description = $$A wistful watercolor portrait of a woman with cascading copper curls and steady blue eyes.
Loose, expressive brushwork lends both softness and presence, refusing to over-define her features.
Warm copper and cool blue play against each other, giving the portrait a quiet tension and grace.$$ WHERE id = '29e9335e-c2ea-448f-bd29-fcff0a83f516';

UPDATE paintings SET description = $$A delicate watercolor lotus blooms over deep green lily pads on a midnight pond.
Soft pinks and blues radiate from the petals like quiet light on water.
The painting holds the stillness of a sacred moment — a single bloom witnessed at the edge of dusk.$$ WHERE id = '25fa61d8-ef20-46a5-bc34-453dfa4eba0f';

UPDATE paintings SET description = $$A monochromatic indigo landscape where bare trees and a winding stream dissolve into deep blue twilight.
Bold washes capture the quiet drama of a winter dusk, when colour gives way to mood.
The single-tone palette deepens the sense of stillness, drawing the eye into the hush of the scene.$$ WHERE id = '04e0daf7-d5c0-4674-8a0f-cd9401fcea18';

UPDATE paintings SET description = $$Two small figures in red and blue walk beneath the dramatic, twisting black branches of an ancient autumn tree.
Tender intimacy framed by nature's grand architecture, the scene feels both sheltered and exposed.
Warm fallen leaves carpet the ground, holding the warmth of the moment against the cool sky.$$ WHERE id = 'bac4f746-356f-4f60-9d31-3d221ee2f701';

UPDATE paintings SET description = $$An ethereal autumn landscape where amber foliage blooms above lavender mist and turquoise water.
Pigments drip and pool, creating a dreamlike sense of season turning before your eyes.
The painting feels less like a place and more like a memory of one — soft, glowing and brief.$$ WHERE id = 'df2d5742-fcec-4eab-8e7c-084259715952';

UPDATE paintings SET description = $$A vibrant cluster of roses, ranunculus and peonies swirls against a violet and magenta wash.
Watercolor pigments bloom and bleed, creating organic dimension and movement across the bouquet.
The composition feels alive — petals unfurling at the edges, colour humming between the blooms.$$ WHERE id = '98951093-983a-4605-bbe5-03623989cd9b';

UPDATE paintings SET description = $$A solitary crimson rose blooms against a soft wash of pastel sky, its petals rendered in luminous reds and warm ochres.
Delicate splatter accents echo the bloom's vitality, scattering its energy across the page.
The painting is a quiet hymn to a single flower, painted with reverence and a steady hand.$$ WHERE id = '80b2a5bd-0a2e-4489-b6c0-b96d4f3ad828';

UPDATE paintings SET description = $$A snow-dusted street scene with a lone car's headlights cutting through grey-blue dusk.
Warm yellow houses glow against the cold palette, balancing chill with quiet warmth.
The painting captures that hushed, suspended feeling of a winter evening softly settling in.$$ WHERE id = 'b1f8d68b-91fd-42ab-92f0-66bf2f0fc5eb';

UPDATE paintings SET description = $$A bold acrylic devotional portrait — a stylised golden-yellow face with deep eyes, vermillion bindi and ornate nose ring.
Set against a black ground with a gilded lattice halo, the figure feels both regal and timeless.
Flat colour planes and crisp ornament reference traditional iconography while feeling distinctly contemporary.$$ WHERE id = '7aab8fb0-0eb2-4d67-acda-9778ff9d9a73';

UPDATE paintings SET description = $$An ink-and-watercolor architectural study of a baroque facade glowing in amber.
Wrought-iron balconies, shuttered windows and a crimson awning anchor the bustling old-town scene.
Loose washes capture the soft warmth of late-afternoon light spilling across centuries-old stone.$$ WHERE id = '14eb8879-27a7-4d10-9ccc-a00b63f569c9';