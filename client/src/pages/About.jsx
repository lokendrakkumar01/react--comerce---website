import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaGraduationCap, FaRocket } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTailwindcss } from 'react-icons/si';

const About = () => {
    const skills = [
        { icon: <SiReact className="w-8 h-8" />, name: 'React.js', color: 'text-blue-400' },
        { icon: <SiNodedotjs className="w-8 h-8" />, name: 'Node.js', color: 'text-green-500' },
        { icon: <SiMongodb className="w-8 h-8" />, name: 'MongoDB', color: 'text-green-600' },
        { icon: <SiExpress className="w-8 h-8" />, name: 'Express.js', color: 'text-gray-400' },
        { icon: <SiJavascript className="w-8 h-8" />, name: 'JavaScript', color: 'text-yellow-400' },
        { icon: <SiTailwindcss className="w-8 h-8" />, name: 'Tailwind CSS', color: 'text-cyan-400' },
    ];

    const highlights = [
        {
            icon: <FaCode className="w-6 h-6" />,
            title: 'Full Stack Development',
            description: 'Expertise in MERN stack development with a focus on scalable and performant applications.'
        },
        {
            icon: <FaLaptopCode className="w-6 h-6" />,
            title: 'Responsive Design',
            description: 'Creating user-friendly, responsive web interfaces that work seamlessly across all devices.'
        },
        {
            icon: <FaGraduationCap className="w-6 h-6" />,
            title: 'Continuous Learning',
            description: 'Constantly exploring new frameworks and tools to stay updated with latest technologies.'
        },
        {
            icon: <FaRocket className="w-6 h-6" />,
            title: 'Modern Technologies',
            description: 'Building with cutting-edge technologies and best practices in web development.'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold gradient-text mb-6">
                        About Me
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                            Lokendrakumar
                        </h2>
                        <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-6">
                            Full Stack Developer | MERN Stack Specialist
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Hello! I'm Lokendrakumar, a passionate full stack Developer specializing in MERN stack development.
                                I'm currently pursuing my <span className="font-semibold text-primary-600 dark:text-primary-400">B.Tech in Computer Science</span> at{' '}
                                <span className="font-semibold">Shri Ramswaroop Memorial University</span> (Powered by Sunstone).
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                I specialize in creating responsive, user-friendly web interfaces with modern technologies.
                                I'm constantly learning and exploring new frameworks and tools to enhance my development skills
                                and deliver exceptional digital experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Skills Section */}
            <div className="bg-gray-100 dark:bg-gray-800/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
                            Technical Skills
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className={skill.color}>{skill.icon}</div>
                                    <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {skill.name}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
                    What I Do
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-primary-500">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education Section */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
                    >
                        <FaGraduationCap className="w-16 h-16 mx-auto mb-6 text-white" />
                        <h3 className="text-3xl font-bold text-white mb-4">Education</h3>
                        <p className="text-xl text-white/90 mb-2">
                            Bachelor of Technology in Computer Science
                        </p>
                        <p className="text-lg text-white/80">
                            Shri Ramswaroop Memorial University
                        </p>
                        <p className="text-md text-white/70 mt-2">
                            Powered by Sunstone
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-3xl font-bold mb-6 gradient-text">
                        Let's Connect
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Interested in collaborating or want to learn more about my work?
                        Feel free to reach out on social media!
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a
                            href="https://linkedin.com/in/lokendrakumar13"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Connect on LinkedIn
                        </a>
                        <a
                            href="http://www.youtube.com/@uaacademy9629"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            Visit YouTube Channel
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
