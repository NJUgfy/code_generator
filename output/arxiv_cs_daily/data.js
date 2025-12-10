var papers = [
  {
    id: "2512.08931v1",
    title: "Astra: General Interactive World Model with Autoregressive Denoising",
    summary: "Recent advances in diffusion transformers have empowered video generation models to generate high-quality video clips from texts or images. However, world models with the ability to predict long-horizon futures from past observations and actions remain underexplored, especially for general-purpose scenarios and various forms of actions. To bridge this gap, we introduce Astra, an interactive general world model that generates real-world futures for diverse scenarios (e.g., autonomous driving, robot grasping) with precise action interactions (e.g., camera motion, robot action). We propose an autoregressive denoising architecture and use temporal causal attention to aggregate past observations and support streaming outputs. We use a noise-augmented history memory to avoid over-reliance on past frames to balance responsiveness with temporal coherence. For precise action control, we introduce an action-aware adapter that directly injects action signals into the denoising process. We further develop a mixture of action experts that dynamically route heterogeneous action modalities, enhancing versatility across diverse real-world tasks such as exploration, manipulation, and camera control. Astra achieves interactive, consistent, and general long-term video prediction and supports various forms of interactions. Experiments across multiple datasets demonstrate the improvements of Astra in fidelity, long-range prediction, and action alignment over existing state-of-the-art world models.",
    authors: ["Yixuan Zhu", "Jiaqi Feng", "Wenzhao Zheng", "Yuan Gao", "Xin Tao", "Pengfei Wan", "Jie Zhou", "Jiwen Lu"],
    categories: ["cs.CV", "cs.AI", "cs.LG"],
    category: "cs.CV",
    published: "2025-12-09T18:59:57Z",
    updated: "2025-12-09T18:59:57Z",
    abstract: "https://arxiv.org/abs/2512.08931v1",
    pdf_url: "https://arxiv.org/pdf/2512.08931v1",
    comment: "Code is available at: https://github.com/EternalEvan/Astra"
  },
  {
    id: "2512.08923v1",
    title: "Same Content, Different Answers: Cross-Modal Inconsistency in MLLMs",
    summary: "We introduce two new benchmarks REST and REST+ (Render-Equivalence Stress Tests) to enable systematic evaluation of cross-modal inconsistency in multimodal large language models (MLLMs). MLLMs are trained to represent vision and language in the same embedding space, yet they cannot perform the same tasks in both modalities. Our benchmarks contain samples with the same semantic information in three modalities (image, text, mixed) and we show that state-of-the-art MLLMs cannot consistently reason over these different modalities. We evaluate 15 MLLMs and find that the degree of modality inconsistency varies substantially, even when accounting for problems with text recognition (OCR). Neither rendering text as image nor rendering an image as text solves the inconsistency. Even if OCR is correct, we find that visual characteristics (text colour and resolution, but not font) and the number of vision tokens have an impact on model performance. Finally, we find that our consistency score correlates with the modality gap between text and images, highlighting a mechanistic interpretation of cross-modal inconsistent MLLMs.",
    authors: ["Angela van Sprang", "Laurens Samson", "Ana Lucic", "Erman Acar", "Sennay Ghebreab", "Yuki M. Asano"],
    categories: ["cs.AI"],
    category: "cs.AI",
    published: "2025-12-09T18:57:07Z",
    updated: "2025-12-09T18:57:07Z",
    abstract: "https://arxiv.org/abs/2512.08923v1",
    pdf_url: "https://arxiv.org/pdf/2512.08923v1",
    comment: "Angela van Sprang and Laurens Samson contributed equally as first authors. Preprint"
  },
  {
    id: "2512.08920v1",
    title: "OSMO: Open-Source Tactile Glove for Human-to-Robot Skill Transfer",
    summary: "Human video demonstrations provide abundant training data for learning robot policies, but video alone cannot capture the rich contact signals critical for mastering manipulation. We introduce OSMO, an open-source wearable tactile glove designed for human-to-robot skill transfer. The glove features 12 three-axis tactile sensors across the fingertips and palm and is designed to be compatible with state-of-the-art hand-tracking methods for in-the-wild data collection. We demonstrate that a robot policy trained exclusively on human demonstrations collected with OSMO, without any real robot data, is capable of executing a challenging contact-rich manipulation task. By equipping both the human and the robot with the same glove, OSMO minimizes the visual and tactile embodiment gap, enabling the transfer of continuous shear and normal force feedback while avoiding the need for image inpainting or other vision-based force inference. On a real-world wiping task requiring sustained contact pressure, our tactile-aware policy achieves a 72% success rate, outperforming vision-only baselines by eliminating contact-related failure modes. We release complete hardware designs, firmware, and assembly instructions to support community adoption.",
    authors: ["Jessica Yin", "Haozhi Qi", "Youngsun Wi", "Sayantan Kundu", "Mike Lambeta", "William Yang", "Changhao Wang", "Tingfan Wu", "Jitendra Malik", "Tess Hellebrekers"],
    categories: ["cs.RO", "cs.LG"],
    category: "cs.RO",
    published: "2025-12-09T18:56:30Z",
    updated: "2025-12-09T18:56:30Z",
    abstract: "https://arxiv.org/abs/2512.08920v1",
    pdf_url: "https://arxiv.org/pdf/2512.08920v1",
    comment: "Project website: https://jessicayin.github.io/osmo_tactile_glove/"
  },
  {
    id: "2512.08930v1",
    title: "Selfi: Self Improving Reconstruction Engine via 3D Geometric Feature Alignment",
    summary: "Novel View Synthesis (NVS) has traditionally relied on models with explicit 3D inductive biases combined with known camera parameters from Structure-from-Motion (SfM) beforehand. Recent vision foundation models like VGGT take an orthogonal approach — 3D knowledge is gained implicitly through training data and loss objectives, enabling feed-forward prediction of both camera parameters and 3D representations directly from a set of uncalibrated images. While flexible, VGGT features lack explicit multi-view geometric consistency, and we find that improving such 3D feature consistency benefits both NVS and pose estimation tasks. We introduce Selfi, a self-improving 3D reconstruction pipeline via feature alignment, transforming a VGGT backbone into a high-fidelity 3D reconstruction engine by leveraging its own outputs as pseudo-ground-truth. Specifically, we train a lightweight feature adapter using a reprojection-based consistency loss, which distills VGGT outputs into a new geometrically-aligned feature space that captures spatial proximity in 3D. This enables state-of-the-art performance in both NVS and camera pose estimation, demonstrating that feature alignment is a highly beneficial step for downstream 3D reasoning.",
    authors: ["Youming Deng", "Songyou Peng", "Junyi Zhang", "Kathryn Heal", "Tiancheng Sun", "John Flynn", "Steve Marschner", "Lucy Chai"],
    categories: ["cs.CV", "cs.GR"],
    category: "cs.CV",
    published: "2025-12-09T18:59:52Z",
    updated: "2025-12-09T18:59:52Z",
    abstract: "https://arxiv.org/abs/2512.08930v1",
    pdf_url: "https://arxiv.org/pdf/2512.08930v1",
    comment: "Project Page: https://denghilbert.github.io/selfi/"
  }
];