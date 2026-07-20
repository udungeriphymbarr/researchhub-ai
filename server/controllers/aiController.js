const { generateAIResponse } = require("../services/aiService");
const Project = require("../models/Project");
const buildProjectMemory = require("../services/aiMemory");
const validateProjectFlow = require("../services/projectFlow");
const User = require("../models/User");

const generateAI = async (req, res) => {
  try {
    const { type, course, prompt, projectId } = req.body;

    let project = null;

    if (projectId) {
      project = await Project.findById(projectId);
    }

    const selectedTopic = project?.selectedTopic || prompt;

    const memory = projectId
      ? await buildProjectMemory(projectId)
      : {
          topic: "",
          questions: "",
          objectives: "",
          literature: "",
          methodology: "",
          abstract: "",
        };

    // ===========================
    // FLOW VALIDATION
    // ===========================

    const flowError = validateProjectFlow(type, memory, selectedTopic);

    if (flowError) {
      return res.status(400).json({
        success: false,
        message: flowError,
      });
    }

    // ===========================
    // TOPIC VALIDATION
    // ===========================

    if (type === "topic") {
      if (!course || !prompt) {
        return res.status(400).json({
          success: false,
          message: "Department and Area of Interest are required.",
        });
      }
    }

    let aiPrompt = "";

    switch (type) {
      // ===========================
      // TOPIC
      // ===========================

      case "topic":
        aiPrompt = `
You are a highly experienced Professor, Academic Research Supervisor, and University Examiner with over 25 years of experience supervising undergraduate and postgraduate research across multiple disciplines.

Your task is to generate EXACTLY TEN original, practical, researchable and academically sound undergraduate research topics.

Department:
${course}

Research Area:
${prompt}

Requirements:

• Topics must be suitable for undergraduate final year projects.
• Topics must reflect current trends and real-world problems.
• Topics should solve practical societal, industrial or educational challenges.
• Avoid overly broad topics.
• Avoid outdated topics.
• Every topic must be unique.
• Topics should be specific enough to be completed within one academic session.
• Make the topics attractive and capable of impressing project supervisors.
• Use professional academic language.

Output Rules:

• Return ONLY the topics.
• No numbering.
• One topic per line.
• No explanations.
`;

        break;

      // ===========================
      // QUESTIONS
      // ===========================

      case "question":
        aiPrompt = `
You are a world-class Professor, Senior Academic Researcher
, University Examiner, Journal Reviewer, and Research Methodologist 
with over 25 years of experience supervising undergraduate,
 master's, and PhD research.
You are writing an undergraduate research project.

Research Topic

${selectedTopic}

Previous Memory

${memory.topic}

Generate:

• Five Research Questions

• Three Research Hypotheses

• One Null Hypothesis

• One Alternative Hypothesis

Rules

• Questions must align with the topic.

• Do not contradict previous outputs.

• Academic language only.

• No explanations.
`;

        break;

      // ===========================
      // DASHBOARD OBJECTIVES
      // ===========================

      case "objectives":
        aiPrompt = `
You are a university research supervisor.
Research Topic

${selectedTopic}

Research Questions

${memory.questions}

Generate

GENERAL OBJECTIVE

SPECIFIC OBJECTIVES (5)

SCOPE OF STUDY

DELIMITATION OF STUDY

Every objective MUST answer at least one research question.
`;

        break;

      // ===========================
      // DASHBOARD PROBLEM STATEMENT
      // ===========================

      case "problem-statement":
        aiPrompt = `
You are an experienced Professor of Academic Research and Thesis Writing.

Write a comprehensive undergraduate Problem Statement for the following research topic:

${prompt}

Requirements:

• 700–1000 words.
• Begin with a strong academic background to the problem.
• Explain the current situation using logical reasoning.
• Identify existing gaps in knowledge, practice or policy.
• Clearly explain why the problem still exists.
• Show the consequences if the problem is ignored.
• Justify why the study is necessary.
• End with a concise statement of the research problem.

Writing Style:

• Formal academic language.
• Human-like writing.
• Logical flow.
• Well-structured paragraphs.
• No bullet points.
• No headings.
• Avoid repetition.
`;

        break;

      // ===========================
      // LITERATURE
      // ===========================

      case "literature":
        aiPrompt = `
You are a world-class Professor, Senior Academic Researcher
, University Examiner, Journal Reviewer, and Research Methodologist 
with over 25 years of experience supervising undergraduate,
 master's, and PhD research.
Write Chapter Two.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Include:

2.1 Introduction

2.2 Conceptual Review

2.3 Theoretical Framework

2.4 Empirical Review

2.5 Knowledge Gap

Requirements

• About 2000 words

• Academic writing

• Consistent with the objectives

• Proper headings
`;

        break;

      // ===========================
      // DASHBOARD RESEARCH QUESTION
      // ===========================

      case "research-question":
        aiPrompt = `
Generate five research questions for:

${prompt}

The questions must be clear, measurable and suitable for undergraduate research.
`;

        break;

      case "objective":
        aiPrompt = `
You are a university research supervisor.

Research Topic:

${prompt}

Generate:

• One General Objective.
• Five Specific Objectives.

Requirements:

• Every objective must directly answer one research question.
• Objectives must begin with action verbs such as:

Determine
Examine
Assess
Investigate
Evaluate
Identify
Analyze
Compare

• Objectives must be SMART.
• Use academic language.
• Arrange them logically.

Return only the objectives.
`;
        break;

      // ===========================
      // METHODOLOGY
      // ===========================

      case "methodology":
        aiPrompt = `
You are a world-class Professor, Senior Academic Researcher
, University Examiner, Journal Reviewer, and Research Methodologist 
with over 25 years of experience supervising undergraduate,
 master's, and PhD research.
Write Chapter Three.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Literature Summary

${memory.literature}

Include

Research Design

Study Area

Population

Sample Size

Sampling Technique

Instrument

Data Collection

Data Analysis

Ethical Considerations

Everything must align with previous chapters.
`;

        break;

      // ===========================
      // DASHBOARD LITERATURE-REVIEW
      // ===========================

      case "literature-review":
        aiPrompt = `
You are a Senior University Lecturer and Academic Researcher.

Write Chapter Two (Literature Review) for:

${prompt}

Include:

2.1 Introduction

2.2 Conceptual Review

2.3 Theoretical Review

2.4 Empirical Review

2.5 Knowledge Gap

Requirements:

• 10,000–15,000 words.
• Professional academic writing.
• Human-like writing.
• Logical transitions.
• Explain concepts thoroughly.
• Compare previous studies.
• Highlight similarities and differences.
• Identify research gaps.
• Avoid plagiarism.
• Use proper chapter headings.
`;

        break;

      // ===========================
      // DASHBOARD SIGNIFICANCE
      // ===========================

      case "significance":
        aiPrompt = `
You are an Academic Research Expert.

Write the Significance of the Study for:

${prompt}

Discuss how the study will benefit:

• Students
• Researchers
• Lecturers
• Policymakers
• Government
• Organizations
• Society
• Future Researchers

Requirements:

• 2000–4000 words.
• Professional academic language.
• Explain each beneficiary in detail.
• Avoid repetition.
• Write naturally.
`;

        break;

      //===========================
      // DASHBOARD METHODOLOGIES
      //===========================

      case "methodologies":
        aiPrompt = `
You are an experienced Research Methodologist.

Write Chapter Three (Research Methodology) for:

${prompt}

Include:

Research Design

Study Area

Population

Sample Size

Sampling Technique

Research Instrument

Validity

Reliability

Method of Data Collection

Method of Data Analysis

Ethical Considerations

Requirements:

• 5,000–7,500 words.
• Undergraduate standard.
• Practical methodology.
• Academic writing.
• Logical explanations.
• Proper headings.
`;

        break;

      // ===========================
      // ABSTRACT
      // ===========================

      case "abstract":
        aiPrompt = `
You are a world-class Professor, Senior Academic Researcher, University Examiner, Journal Reviewer, and Research Methodologist 
with over 25 years of experience supervising undergraduate, master's, and PhD research.
        Write an undergraduate Abstract.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Literature

${memory.literature}

Methodology

${memory.methodology}

Requirements

Maximum 300 words.

Include

Background

Aim

Methodology

Expected Findings

Conclusion

Keywords
`;

        break;

      //=====================
      //DASHBOARD ABSTRACTS
      //=====================

      case "abstracts":
        aiPrompt = `
You are a Professor of Academic Writing.

Write a complete undergraduate Abstract for:

${prompt}

Maximum 300 words.

The abstract must include:

• Background
• Purpose of the Study
• Research Objectives
• Methodology
• Expected Findings
• Conclusion
• Keywords

Requirements:

• Professional academic writing.
• One continuous paragraph.
• Clear and concise.
• Suitable for submission to a university.
`;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid AI Tool",
        });
    }

    // ===========================
    // AI RESPONSE
    // ===========================

    const response = await generateAIResponse(aiPrompt);

    let output;

    if (type === "topic" || type === "question" || type === "objective") {
      output = response.split("\n").filter((line) => line.trim() !== "");
    } else {
      output = response;
    }

    // Increase AI usage count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        usageCount: 1,
      },
    });

    return res.status(200).json({
      success: true,
      output,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI Generation Failed",
    });
  }
};

module.exports = {
  generateAI,
};
