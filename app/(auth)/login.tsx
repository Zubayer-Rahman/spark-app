import React, {useRef, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from "react-native";
import { Checkbox } from 'expo-checkbox';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const currentHeight = useRef(0);

    const handleLogin = () => {
        router.replace("/(tabs)/home");
        console.log("Login:", email, password);
    };



    return (
        <LinearGradient
            colors={["rgba(206, 234, 211, 1)", "rgba(248, 252, 245, 1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.35]}
            style={styles.gradient}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={require("../../assets/images/login-picture.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Login to your Account</Text>
                        <Text style={styles.subtitle}>Welcome to your soft reset</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#999"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoComplete="password"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeButton}
                                >
                                    <Text style={styles.eyeIcon}>
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.rememberMeConatiner}>
                            {/* Remember Me */}
                            <View style={styles.rememberMe}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isChecked}
                                    onValueChange={setChecked}
                                    color={isChecked ? '#6C7278' : undefined}
                                />
                                <Text style={styles.rememberMeText}>Remember me</Text>
                            </View>

                            {/* Forgot Password */}
                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>


                        <TouchableOpacity>
                            <Text style={{color: "#9CA3AF"}}>Not a member? <Text style={{color: "#685A57"}}>Register</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 40) + 20 : 60,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2C2C2C",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#9CA3AF",
        textAlign: "center",
    },
    formContainer: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6C7278",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: "#333",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: "#333",
    },
    eyeButton: {
        padding: 10,
        paddingRight: 16,
    },
    eyeIcon: {
        fontSize: 20,
    },
    forgotPassword: {
        alignItems: "center",
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: "#DC143C",
        alignSelf: "center",
        fontWeight: "500",

    },
    loginButton: {
        backgroundColor: "#010101",
        borderRadius: 24,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 24,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    checkbox: {
        marginRight: 8,
    },
    rememberMeConatiner:{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    rememberMe:{
        flexDirection: "row",
        alignItems: "center",
    },
    rememberMeText:{
      fontSize: 14,
      fontWeight: "500",
      color: "#6C7278",
    },
});